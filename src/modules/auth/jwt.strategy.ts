import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioPayload } from './types/Usuario';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
            signOptions: { expiresIn: '1h' },
            ingoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'defaultSecretKey', 
        });
    }

    async validarUsuario(payload: UsuarioPayload) {
        return { userId: payload.sub, username: payload.username };
    }
}
