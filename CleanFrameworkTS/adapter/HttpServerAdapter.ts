import * as http from 'http';
import { IServer, RouteHandler } from '../port/IServer';
import { IRequest } from '../port/IRequest';
import { IResponse } from '../port/IResponse';

interface Route {
    method: string;
    pattern: RegExp;
    paramNames: string[];
    handler: RouteHandler;
}

export class HttpServerAdapter implements IServer {
    private host: string;
    private port: number;
    private server: http.Server | null = null;
    private routes: Route[] = [];

    constructor(host: string = 'localhost', port: number = 8000) {
        this.host = host;
        this.port = port;
    }

    private pathToRegex(path: string): { pattern: RegExp; paramNames: string[] } {
        const paramNames: string[] = [];
        const pattern = path.replace(/:([^/]+)/g, (_, paramName) => {
            paramNames.push(paramName);
            return '([^/]+)';
        });
        return { pattern: new RegExp(`^${pattern}$`), paramNames };
    }

    private registerRoute(method: string, path: string, handler: RouteHandler): void {
        const { pattern, paramNames } = this.pathToRegex(path);
        this.routes.push({ method, pattern, paramNames, handler });
    }

    get(path: string, handler: RouteHandler): void {
        this.registerRoute('GET', path, handler);
    }

    post(path: string, handler: RouteHandler): void {
        this.registerRoute('POST', path, handler);
    }

    put(path: string, handler: RouteHandler): void {
        this.registerRoute('PUT', path, handler);
    }

    delete(path: string, handler: RouteHandler): void {
        this.registerRoute('DELETE', path, handler);
    }

    private parseQuery(url: string): Record<string, string> {
        const query: Record<string, string> = {};
        const queryIndex = url.indexOf('?');
        if (queryIndex !== -1) {
            const queryString = url.slice(queryIndex + 1);
            queryString.split('&').forEach(pair => {
                const [key, value] = pair.split('=');
                query[decodeURIComponent(key)] = decodeURIComponent(value || '');
            });
        }
        return query;
    }

    private createResponse(res: http.ServerResponse): IResponse {
        let statusCode = 200;
        return {
            status(code: number): IResponse {
                statusCode = code;
                return this;
            },
            json(data: unknown): void {
                res.writeHead(statusCode, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            },
            send(data: string): void {
                res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        };
    }

    start(): void {
        this.server = http.createServer(async (req, res) => {
            const method = req.method || 'GET';
            const url = req.url || '/';
            const path = url.split('?')[0];

            for (const route of this.routes) {
                if (route.method !== method) continue;

                const match = path.match(route.pattern);
                if (match) {
                    const params: Record<string, string> = {};
                    route.paramNames.forEach((name, i) => {
                        params[name] = match[i + 1];
                    });

                    let body: unknown = null;
                    if (method === 'POST' || method === 'PUT') {
                        body = await this.parseBody(req);
                    }

                    const request: IRequest = {
                        method,
                        path,
                        params,
                        query: this.parseQuery(url),
                        body
                    };

                    const response = this.createResponse(res);
                    await route.handler(request, response);
                    return;
                }
            }

            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not Found' }));
        });

        this.server.listen(this.port, this.host, () => {
            console.log(`Server started at http://${this.host}:${this.port}`);
        });
    }

    private parseBody(req: http.IncomingMessage): Promise<unknown> {
        return new Promise((resolve) => {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch {
                    resolve(body);
                }
            });
        });
    }

    stop(): void {
        if (this.server) {
            this.server.close(() => {
                console.log('Server stopped');
            });
            this.server = null;
        }
    }
}
