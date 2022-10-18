import { Body, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { CategoriaService } from "src/categoria/services/categoria.service";


@Controller('/categoria')
export class CategoriaController{

    constructor(
        private readonly categoriaService: CategoriaService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    callFindAll(): Promise<Categoria[]> {
        return this.categoriaService.findAll()
    }
    
    @Post()
    @HttpCode(HttpStatus.OK)
    callCreate(@Body() categoria: Categoria): Promise <Categoria>{
        return this.categoriaService.create(categoria)
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    callFindById(@Param('id', ParseIntPipe )id: number): Promise <Categoria>{
        return this.categoriaService.findById(id)
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    callFindByName(@Param('nome') nome: string): Promise <Categoria[]>{
        return this.categoriaService.findByName(nome)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    callUpdate(categoria: Categoria): Promise <Categoria>{
        return this.categoriaService.update(categoria)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.categoriaService.delete(id);
    }
}