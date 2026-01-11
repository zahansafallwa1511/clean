export class Redis {
    connect(host: string, port: number): boolean {
        return true;
    }

    get(key: string): unknown {
        return null;
    }

    set(key: string, value: unknown): boolean {
        return true;
    }
}
