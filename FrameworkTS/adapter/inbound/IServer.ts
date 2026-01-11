export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IRequest {
    method: HttpMethod;
    path: string;
    params: Record<string, string>;
    body: unknown;
    query: Record<string, string>;
}

export interface IResponse {
    status(code: number): IResponse;
    json(data: unknown): void;
    send(body: string): void;
}

export type RouteHandler = (req: IRequest, res: IResponse) => void;

export interface IServer {
    get(path: string, handler: RouteHandler): void;
    post(path: string, handler: RouteHandler): void;
    put(path: string, handler: RouteHandler): void;
    delete(path: string, handler: RouteHandler): void;
    listen(port: number, callback?: () => void): void;
    stop(): void;
}
