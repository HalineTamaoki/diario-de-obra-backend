import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Request, UseGuards } from "@nestjs/common";
import { Request as RequestType } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { DataAdicionalDto, NovaDataAdicional } from "./dto/dataAdicional";
import { ExecucaoDto } from "./dto/execucao";
import { ExecucaoService } from "./execucao.service";

interface AuthRequest extends RequestType {
  user: { id: number; [key: string]: any };
}

@Controller('execucao')
@UseGuards(JwtAuthGuard)
export class ExecucaoController {
    constructor(private execucaoService: ExecucaoService) {}

    @HttpCode(HttpStatus.OK)
    @Get(':idItem')
    async get(@Param('idItem', ParseIntPipe) idItem: number, @Request() req: AuthRequest) {
      return this.execucaoService.get(idItem, req.user.id);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Post(':idItem')
    async cadastrarDataAdicional(@Param('idItem', ParseIntPipe) idItem: number, @Body() data: NovaDataAdicional, @Request() req: AuthRequest) {
      return this.execucaoService.cadastrarDataAdicional(idItem, data, req.user.id);
    }
    
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Put(':idItem')
    async editar(@Param('idItem', ParseIntPipe) idItem: number, @Body() execucao: ExecucaoDto, @Request() req: AuthRequest) {
      return this.execucaoService.editar(idItem, execucao, req.user.id);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Put('data-adicional/:id')
    async editarDataAdicional(@Param('id', ParseIntPipe) id: number, @Body() data: DataAdicionalDto, @Request() req: AuthRequest) {
      return this.execucaoService.editarDataAdicional(id, data, req.user.id);
    }

    @HttpCode(HttpStatus.OK)  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletarDataAdicional(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
      return this.execucaoService.deletarDataAdicional(id, req.user.id);
    }
}