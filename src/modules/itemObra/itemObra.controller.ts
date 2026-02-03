import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Request, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Request as RequestType } from "express";
import { ItemObraService } from "./itemObra.service";
import { IdNome, Nome } from "src/dto/idNome";

interface AuthRequest extends RequestType {
  user: { id: number; [key: string]: any };
}

@Controller('item')
@UseGuards(JwtAuthGuard)
export class ItemObraController {
    constructor(private itemObraService: ItemObraService) {}

    @HttpCode(HttpStatus.OK)
    @Get(':idObra')
    async get(@Param('idObra', ParseIntPipe) idObra: number, @Request() req: AuthRequest) {
      return this.itemObraService.get(idObra, req.user.id);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Post(':idObra')
    async cadastrar(@Param('idObra', ParseIntPipe) idObra: number, @Body() itemObra: Nome, @Request() req: AuthRequest) {
      return this.itemObraService.cadastrar(idObra, itemObra, req.user.id);
    }
    
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Put()
    async editar(@Body() itemObra: IdNome, @Request() req: AuthRequest) {
      return this.itemObraService.editar(itemObra, req.user.id);
    }

    @HttpCode(HttpStatus.OK)  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletar(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
      return this.itemObraService.deletar(id, req.user.id);
    }
}