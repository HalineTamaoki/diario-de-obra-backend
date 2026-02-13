import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Request, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Request as RequestType } from "express";
import { Selecionar } from "../../dto/selecionar";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { OrcamentoDetalhes, OrcamentoDetalhesId } from "./dto/orcamento";
import { OrcamentoService } from "./orcamento.service";

interface AuthRequest extends RequestType {
  user: { id: number; [key: string]: any };
}

@Controller('orcamento')
@UseGuards(JwtAuthGuard)
export class OrcamentoController {
    constructor(private orcamentoService: OrcamentoService) {}

    @HttpCode(HttpStatus.OK)
    @Get(':idItem')
    async get(@Param('idItem') idItem: number, @Request() req: AuthRequest) {
      return this.orcamentoService.get(idItem, req.user.id);
    }

    @HttpCode(HttpStatus.OK)
    @Get('/detalhes/:idOrcamento')
    async getDetalhes(@Param('idOrcamento', ParseIntPipe) idOrcamento: number, @Request() req: AuthRequest) {
      return this.orcamentoService.getDetalhes(idOrcamento, req.user.id);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Post(':idItem')
    async cadastrar(@Param('idItem') idItem: number, @Body() orcamento: OrcamentoDetalhes, @Request() req: AuthRequest) {
      return this.orcamentoService.cadastrar(idItem, orcamento, req.user.id);
    }
    
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Put()
    async editar(@Body() orcamento: OrcamentoDetalhesId, @Request() req: AuthRequest) {
      return this.orcamentoService.editar(orcamento, req.user.id);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Post(':idOrcamento/selecionar')
    async selecionar(@Param('idOrcamento') idOrcamento: number, @Body() orcamento: Selecionar, @Request() req: AuthRequest) {
      return this.orcamentoService.selecionar(idOrcamento, orcamento, req.user.id);
    }

    @HttpCode(HttpStatus.OK)  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletar(@Param('id') id: number, @Request() req: AuthRequest) {
      return this.orcamentoService.deletar(id, req.user.id);
    }
}