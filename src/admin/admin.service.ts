import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "./admin.entity";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
    constructor(@InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
        private jwtService: JwtService) { }

    async match(id: string, password: string): Promise<{ access_token: string }> {
        const row = await this.adminRepository.findOneBy({ id });
        if (row == null) {
            throw new UnauthorizedException();

        } else if (row.password !== password) {
            throw new UnauthorizedException();
        }
        // Generate JWT
        const payload = { sub: row.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };

    }
}