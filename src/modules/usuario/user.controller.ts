import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { fieldExceptionFactory } from "../../utils/utils";
import { UsuarioDto } from "../../dto/usuario";
import { UserService } from "./user.service";

@Controller('usuario')
export class UserController {
    constructor(private userService: UserService) {}

    @HttpCode(HttpStatus.OK)
    @Post()
    @UsePipes(new ValidationPipe({ groups: ['create'], exceptionFactory: fieldExceptionFactory }))
    async cadastrar(@Body() usuario: UsuarioDto): Promise<{id: number, email: string}> {
      return this.userService.cadastrar(usuario);
    }
}