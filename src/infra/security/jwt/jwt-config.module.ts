// src/jwt/jwt-config.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvService } from 'src/env/env.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: (env: EnvService) => {
        const publicKey = env.get('JWT_PUBLIC_KEY');

        return {
          signOptions: { algorithm: 'RS256', expiresIn: '1h' },
          publicKey: Buffer.from(publicKey, 'base64'),
        };
      },
    }),
  ],
  exports: [JwtModule],
})
export class JwtConfigModule {}
