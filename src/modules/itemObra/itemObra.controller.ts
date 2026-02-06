import { Body, Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Request, UseGuards } from "@nestjs/common";
import { Request as RequestType } from "express";
import { IdNome, Nome } from "src/dto/idNome";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ItemObraService } from "./itemObra.service";

interface AuthRequest extends RequestType {
  user: { id: number; [key: string]: any };
}

@Controller('item')
@UseGuards(JwtAuthGuard)
export class ItemObraController {
    constructor(private itemObraService: ItemObraService) {}

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