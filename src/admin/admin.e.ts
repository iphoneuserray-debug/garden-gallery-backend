import { IsEmail, IsString } from "class-validator";

export class AdminDto {
    @IsEmail()
    id: string;

    @IsString()
    password: string;
}