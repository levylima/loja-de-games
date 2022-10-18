import { IsNotEmpty } from "class-validator"
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


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
}