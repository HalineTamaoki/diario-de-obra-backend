import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Request, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { IdNome, Nome } from "../../dto/idNome";
import { ObraService } from "./obra.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Request as RequestType } from "express";

interface AuthRequest extends RequestType {
  user: { id: number; [key: string]: any };
}

@Controller('obra')
@UseGuards(JwtAuthGuard)
export class ObraController {
    constructor(private obraService: ObraService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    async get(@Request() req: AuthRequest) {
      return this.obraService.get(req.user.id);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(new ValidationPipe({ groups: ['default'] }))
    async cadastrar(@Body() nomeObra: Nome, @Request() req: AuthRequest) {
      return this.obraService.cadastrar(nomeObra, req.user.id);
    }
    
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Put()
    async editar(@Body() obra: IdNome, @Request() req: AuthRequest) {
      return this.obraService.editar(obra, req.user.id);
    }

    @HttpCode(HttpStatus.OK)  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletar(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
      return this.obraService.deletar(id, req.user.id);
    }
}