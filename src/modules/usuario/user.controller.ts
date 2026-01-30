import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { fieldExceptionFactory } from "src/utils/utils";
import { UsuarioDto } from "../../dto/usuario";
import { UserService } from "./user.service";

@Controller('usuario')
export class UserController {
    constructor(private userService: UserService) {}

    @HttpCode(HttpStatus.OK)
    @Post()
    @UsePipes(new ValidationPipe({ groups: ['create'], exceptionFactory: fieldExceptionFactory }))
    async cadastrar(@Body() usuario: UsuarioDto) {
      return this.userService.cadastrar(usuario);
    }
}