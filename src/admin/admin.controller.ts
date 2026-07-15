import { AdminDto } from './admin.e';
import { AdminService } from './admin.service';
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from './admin.guard';

@Controller('auth')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() adminDto: AdminDto) {
        return this.adminService.match(adminDto.id, adminDto.password);
    }
}
