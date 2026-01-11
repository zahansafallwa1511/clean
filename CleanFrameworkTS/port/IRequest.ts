export interface IRequest {
    method: string;
    path: string;
    params: Record<string, string>;
    query: Record<string, string>;
    body: unknown;
}
