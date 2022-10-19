import { IsNotEmpty } from "class-validator"
import { Produto } from "src/produto/entities/produto.entity"
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


//A Classe categoria se torna uma entidade.
@Entity({name: 'tb_categorias'})
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty() //Indica que coluna 
    @Column({length: 255, nullable: false})
    nome: string

    createAt: Date

    @UpdateDateColumn()
    updateAt: Date;

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produto: Produto[]
}