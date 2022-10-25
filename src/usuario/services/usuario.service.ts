import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bcrypt } from "src/auth/bcrypt/bcrypt";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";


@Injectable()
exports class UsuarioService {

    constructor (
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    async findByUsuario(usuario: string): Promise<Usuario | undefined> {

        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find(
            {
                relations: {
                    produto: true
                }
            }
        )
    }
}