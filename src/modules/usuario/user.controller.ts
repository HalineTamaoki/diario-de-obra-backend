import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { Usuario } from "../../dto/usuario";
import { UserService } from "./user.service";
import { fieldExceptionFactory } from "src/utils/utils";

@Controller('usuario')
export class UserController {
    constructor(private userService: UserService) {}

    @HttpCode(HttpStatus.OK)
    @Post()
    @UsePipes(new ValidationPipe({ groups: ['create'], exceptionFactory: fieldExceptionFactory }))
    async cadastrar(@Body() usuario: Usuario) {
      return this.userService.cadastrar(usuario);
    }
}