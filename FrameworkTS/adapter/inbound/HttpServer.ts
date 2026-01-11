import * as http from 'http';
import { IServer, IRequest, IResponse, RouteHandler, HttpMethod } from './IServer';

interface IRoute {
    method: HttpMethod;
    pattern: RegExp;
    paramNames: string[];
    handler: RouteHandler;
}

export class HttpServer implements IServer {
    private server: http.Server | null = null;
    private routes: IRoute[] = [];

    private parsePath(path: string): { pattern: RegExp; paramNames: string[] } {
        const paramNames: string[] = [];
        const pattern = path.replace(/:(\w+)/g, (_, name) => {
            paramNames.push(name);
            return '([^/]+)';
        });
        return { pattern: new RegExp(`^${pattern}$`), paramNames };
    }

    get(path: string, handler: RouteHandler): void {
        const { pattern, paramNames } = this.parsePath(path);
        this.routes.push({ method: 'GET', pattern, paramNames, handler });
    }

    post(path: string, handler: RouteHandler): void {
        const { pattern, paramNames } = this.parsePath(path);
        this.routes.push({ method: 'POST', pattern, paramNames, handler });
    }

    put(path: string, handler: RouteHandler): void {
        const { pattern, paramNames } = this.parsePath(path);
        this.routes.push({ method: 'PUT', pattern, paramNames, handler });
    }

    delete(path: string, handler: RouteHandler): void {
        const { pattern, paramNames } = this.parsePath(path);
        this.routes.push({ method: 'DELETE', pattern, paramNames, handler });
    }

    listen(port: number, callback?: () => void): void {
        this.server = http.createServer((nodeReq, nodeRes) => {
            this.handleRequest(nodeReq, nodeRes);
        });
        this.server.listen(port, callback);
    }

    stop(): void {
        this.server?.close();
        this.server = null;
    }

    private handleRequest(nodeReq: http.IncomingMessage, nodeRes: http.ServerResponse): void {
        const url = new URL(nodeReq.url || '/', `http://${nodeReq.headers.host}`);
        const query: Record<string, string> = {};
        url.searchParams.forEach((value, key) => query[key] = value);

        let body = '';
        nodeReq.on('data', (chunk) => body += chunk.toString());
        nodeReq.on('end', () => {
            const req: IRequest = {
                method: nodeReq.method as HttpMethod,
                path: url.pathname,
                params: {},
                body: body ? JSON.parse(body) : null,
                query
            };
            const res = this.createResponse(nodeRes);
            this.route(req, res);
        });
    }

    private route(req: IRequest, res: IResponse): void {
        for (const route of this.routes) {
            if (route.method !== req.method) continue;

            const match = req.path.match(route.pattern);
            if (match) {
                route.paramNames.forEach((name, i) => req.params[name] = match[i + 1]);
                route.handler(req, res);
                return;
            }
        }
        res.status(404).json({ error: 'Not Found' });
    }

    private createResponse(nodeRes: http.ServerResponse): IResponse {
        let statusCode = 200;
        return {
            status(code: number) { statusCode = code; return this; },
            json(data: unknown) {
                nodeRes.writeHead(statusCode, { 'Content-Type': 'application/json' });
                nodeRes.end(JSON.stringify(data));
            },
            send(body: string) {
                nodeRes.writeHead(statusCode, { 'Content-Type': 'text/plain' });
                nodeRes.end(body);
            }
        };
    }
}
