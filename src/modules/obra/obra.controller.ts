import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { IdNome } from "../../dto/idNome";
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
    async cadastrar(@Body() obra: IdNome, @Request() req: AuthRequest) {
      return this.obraService.cadastrar(obra, req.user.id);
    }

    
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Put()
    @UsePipes(new ValidationPipe({ groups: ['edit'] }))
    async editar(@Body() obra: IdNome, @Request() req: AuthRequest) {
      return this.obraService.editar(obra, req.user.id);
    }

    @HttpCode(HttpStatus.OK)  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletar(@Param('id') id: number, @Request() req: AuthRequest) {
      return this.obraService.deletar(id, req.user.id);
    }
}