import { Body, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../services/produto.service";



@Controller('/produto')
export class ProdutoController{

    constructor(
        private readonly produtoService: ProdutoService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    callFindAll(): Promise<Produto[]> {
        return this.produtoService.findAll()
    }
    
    @Post()
    @HttpCode(HttpStatus.OK)
    callCreate(@Body() produto: Produto): Promise <Produto>{
        return this.produtoService.create(produto)
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    callFindById(@Param('id', ParseIntPipe )id: number): Promise <Produto>{
        return this.produtoService.findById(id)
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    callFindByName(@Param('nome') nome: string): Promise <Produto[]>{
        return this.produtoService.findByName(nome)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    callUpdate(produto: Produto): Promise <Produto>{
        return this.produtoService.update(produto)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.produtoService.delete(id);
    }
}