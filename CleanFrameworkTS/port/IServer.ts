import { IRequest } from './IRequest';
import { IResponse } from './IResponse';

export type RouteHandler = (req: IRequest, res: IResponse) => void | Promise<void>;

export interface IServer {
    get(path: string, handler: RouteHandler): void;
    post(path: string, handler: RouteHandler): void;
    put(path: string, handler: RouteHandler): void;
    delete(path: string, handler: RouteHandler): void;
    start(): void;
    stop(): void;
}
