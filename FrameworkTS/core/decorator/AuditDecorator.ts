import { IUserUseCase } from '../../port/inbound/IUserUseCase';
import { User } from '../entity/User';
import { CreateUserDTO } from '../dto/CreateUserDTO';

interface AuditLog {
    timestamp: Date;
    action: string;
    details: string;
}

export class AuditDecorator implements IUserUseCase {
    private auditLogs: AuditLog[] = [];

    constructor(private wrapped: IUserUseCase) {}

    getUser(userId: number): User | null {
        this.log('GET_USER', `Accessed user ${userId}`);
        return this.wrapped.getUser(userId);
    }

    createUser(dto: CreateUserDTO): User {
        const result = this.wrapped.createUser(dto);
        this.log('CREATE_USER', `Created user ${result.getId()}: ${dto.name}`);
        return result;
    }

    private log(action: string, details: string): void {
        const entry: AuditLog = {
            timestamp: new Date(),
            action,
            details
        };
        this.auditLogs.push(entry);
        console.log(`[AUDIT] ${entry.timestamp.toISOString()} - ${action}: ${details}`);
    }

    getAuditLogs(): AuditLog[] {
        return [...this.auditLogs];
    }
}
