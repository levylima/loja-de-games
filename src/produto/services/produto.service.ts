import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";

//O decorator @Injectable indica que a classe é do tipo Service (Classe de Serviço), que pode ser Injetada em outras Classes através da Injeção de Dependências.
@Injectable()
export class ProdutoService {
    constructor (
        @InjectRepository(Produto)
        private produtoRepository: Repository <Produto>
    ){}

    async create (produto: Produto): Promise <Produto> {
        return await this.produtoRepository.save(produto);
    }

    async findAll(): Promise <Produto[]> {
        return await this.produtoRepository.find();
    }

    async findById(id: number): Promise <Produto> {
        const produtoExiste = await this.produtoRepository.findOne({
            where: {
                id
            }
        });
            if(!produtoExiste) {
                throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)
            }
            return produtoExiste
    }

    async findByName(nome: string): Promise <Produto[]> {
        return this.produtoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            }
        });
    }

    async update (produto) {
        const produtoExiste = await this.findById(produto.id);

        if (!produtoExiste || produto.id){
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND)
        }
        return this.produtoRepository.save(produto)
    }

    async delete (id: number): Promise <DeleteResult> {
        let buscaProduto = await this.findById(id);

        if (!buscaProduto)
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
        return await this.produtoRepository.delete(id);
    }
}