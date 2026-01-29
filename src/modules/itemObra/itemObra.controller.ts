import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Request as RequestType } from "express";
import { ItemObraService } from "./itemObra.service";
import { IdNome } from "src/dto/idNome";

interface AuthRequest extends RequestType {
  user: { id: number; [key: string]: any };
}

@Controller('item')
@UseGuards(JwtAuthGuard)
export class ItemObraController {
    constructor(private itemObraService: ItemObraService) {}

    @HttpCode(HttpStatus.OK)
    @Get(':idObra')
    async get(@Param('idObra') idObra: number, @Request() req: AuthRequest) {
      return this.itemObraService.get(idObra, req.user.id);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Post(':idObra')
    async cadastrar(@Param('idObra') idObra: number, @Body() itemObra: IdNome, @Request() req: AuthRequest) {
      return this.itemObraService.cadastrar(idObra, itemObra, req.user.id);
    }

    
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Put(':idObra')
    @UsePipes(new ValidationPipe({ groups: ['edit'] }))
    async editar(@Param('idObra') idObra: number, @Body() itemObra: IdNome, @Request() req: AuthRequest) {
      return this.itemObraService.editar(idObra, itemObra, req.user.id);
    }

    @HttpCode(HttpStatus.OK)  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletar(@Param('id') id: number, @Request() req: AuthRequest) {
      return this.itemObraService.deletar(id, req.user.id);
    }
}