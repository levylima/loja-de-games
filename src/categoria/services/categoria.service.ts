import { HttpException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { HttpStatus } from "@nestjs/common/enums";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable()
export class CategoriaService {


    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ){}

    async create (categoria: Categoria): Promise<Categoria> {
        return await this.categoriaRepository.save(categoria);
    }


    async findAll(): Promise<Categoria[]>{
        return await this.categoriaRepository.find({
            relations: {
                produto: true
            }
        });
    }

    async findById(id: number): Promise <Categoria> {
        const categoriaExiste = await this.categoriaRepository.findOne({
            where: {
                id
            }
        });
            if(!categoriaExiste){
                throw new HttpException('Categoria não encontrado!', HttpStatus.NOT_FOUND)
            }
            
            return categoriaExiste
    }
    
    async findByName(name: string): Promise <Categoria[]>{
        return this.categoriaRepository.find({
            where: {
                nome: ILike(`%${name}%`)
            }
        });
    }

    async update(categoria){
        const categoriaExiste = await this.findById(categoria.id);

        if(!categoriaExiste || !categoria.id){
            throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND)
        }

        return this.categoriaRepository.save(categoria)
    }
    async delete (id: number): Promise <DeleteResult> {
        let buscaCategoria = await this.findById(id);

        if(!buscaCategoria)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
        return await this.categoriaRepository.delete(id);
    }

}