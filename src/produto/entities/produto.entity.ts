import { IsNotEmpty } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"



@Entity({name: 'tb_produtos'})
export class Produto {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty() 
    @Column({length: 255, nullable: false})
    nome: string

    @UpdateDateColumn()
    data: Date
}