export class User {
    private readonly id: number;
    private name: string;
    private email: string;

    constructor(id: number, name: string, email: string) {
        if (!name || name.trim().length === 0) {
            throw new Error('Name is required');
        }
        if (!email || !email.includes('@')) {
            throw new Error('Valid email is required');
        }
        this.id = id;
        this.name = name.trim();
        this.email = email.trim();
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    changeName(name: string): void {
        if (!name || name.trim().length === 0) {
            throw new Error('Name is required');
        }
        this.name = name.trim();
    }

    changeEmail(email: string): void {
        if (!email || !email.includes('@')) {
            throw new Error('Valid email is required');
        }
        this.email = email.trim();
    }

    toJSON(): { id: number; name: string; email: string } {
        return { id: this.id, name: this.name, email: this.email };
    }
}
