import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Request as RequestType } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { IdeiaDto } from "./dto/ideacao";
import { IdeacaoService } from "./ideacao.service";

interface AuthRequest extends RequestType {
  user: { id: number; [key: string]: any };
}

@Controller('ideacao')
@UseGuards(JwtAuthGuard)
export class IdeacaoController {
    constructor(private ideacaoService: IdeacaoService) {}

    @HttpCode(HttpStatus.OK)
    @Get(':idItem')
    async get(@Param('idItem') idItem: number, @Request() req: AuthRequest) {
      return this.ideacaoService.get(idItem, req.user.id);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Post(':idItem')
    async cadastrar(@Param('idItem') idItem: number, @Body() ideia: IdeiaDto, @Request() req: AuthRequest) {
      return this.ideacaoService.cadastrar(idItem, ideia, req.user.id);
    }
    
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Put(':idItem')
    @UsePipes(new ValidationPipe({ groups: ['edit'] }))
    async editar(@Param('idItem') idItem: number, @Body() ideia: IdeiaDto, @Request() req: AuthRequest) {
      return this.ideacaoService.editar(idItem, ideia, req.user.id);
    }

    @HttpCode(HttpStatus.OK)  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletar(@Param('id') id: number, @Request() req: AuthRequest) {
      return this.ideacaoService.deletar(id, req.user.id);
    }
}