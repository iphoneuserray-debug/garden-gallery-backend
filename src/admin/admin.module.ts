import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminGuard } from './admin.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        TypeOrmModule.forFeature([Admin]),
        JwtModule.registerAsync({
            global: true,
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get('SECRET'),
                signOptions: { expiresIn: '12h' },
            }),
        }),
    ],
    providers: [
        AdminService,
        {
            provide: APP_GUARD,
            useClass: AdminGuard,
        },
    ],
    controllers: [AdminController],
    exports: [AdminService],
})
export class AdminAuthModule { }
