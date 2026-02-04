import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { Request as RequestType } from "express";
import { Selecionar } from "src/dto/selecionar";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { EditarComentario } from "./dto/finalizacao";
import { FinalizacaoService } from "./finalizacao.service";

interface AuthRequest extends RequestType {
  user: { id: number; [key: string]: any };
}

@Controller('finalizacao')
@UseGuards(JwtAuthGuard)
export class FinalizacaoController {
    constructor(private finalizacaoService: FinalizacaoService) {}

    @HttpCode(HttpStatus.OK)
    @Get(':idItem')
    async get(@Param('idItem') idItem: number, @Request() req: AuthRequest) {
      return this.finalizacaoService.get(idItem, req.user.id);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Post(':idItem')
    async selecionarFinalizado(@Param('idItem') idItem: number, @Body() selecionar: Selecionar, @Request() req: AuthRequest) {
      return this.finalizacaoService.selecionarFinalizado(idItem, selecionar, req.user.id);
    }
    
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Put(':idItem')
    async editarComentario(@Param('idItem') idItem: number, @Body() comentario: EditarComentario, @Request() req: AuthRequest) {
      return this.finalizacaoService.editarComentario(idItem, comentario, req.user.id);
    }
}