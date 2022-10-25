import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from '@nestjs/common';
import { Usuario } from "./entities/usuario.entity";


@Module({

    imports: [TypeOrmModule.forFeature([Usuario])],
    providers: [],
    controllers: [],
    exports: []
})

export class UsuarioModule { }