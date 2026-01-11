export interface IResponse {
    status(code: number): IResponse;
    json(data: unknown): void;
    send(data: string): void;
}
