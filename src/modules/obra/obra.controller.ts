import { Body, Controller, HttpCode, HttpStatus, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Obra } from "./dto/obra";
import { ObraService } from "./obra.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('obra')
export class ObraController {
    constructor(private obraService: ObraService) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Post()
    async cadastrar(@Body() obra: Obra) {
      return this.obraService.cadastrar(obra);
    }

    
    @HttpCode(HttpStatus.OK)
    @Put()
    @UsePipes(new ValidationPipe({ groups: ['edit'] }))
    async editar(@Body() obra: Obra) {
      return this.obraService.editar(obra);
    }
}