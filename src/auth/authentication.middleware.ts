import { NestMiddleware, Injectable } from '@nestjs/common';
import * as jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { ConfService } from '../conf.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  keycloakRealm: string;
  keycloakAuthServerUrl: string;
  keycloakAudience: string;
  keycloakRole: string;

  constructor(config: ConfService) {
    this.keycloakRealm = config.get('KEYCLOAK_REALM');
    this.keycloakAuthServerUrl = config.get('KEYCLOAK_AUTH_SERVER_URL');
    this.keycloakAudience = config.get('KEYCLOAK_AUDIENCE');
    this.keycloakRole = config.get('KEYCLOAK_ROLE');
  }

  use(req, res, next) {
    jwt({
      secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: this.keycloakAuthServerUrl + 'realms/' + this.keycloakRealm + '/protocol/openid-connect/certs',
      }),

      audience: this.keycloakAudience,
      issuer: this.keycloakAuthServerUrl + 'realms/' + this.keycloakRealm,
      algorithm: 'RS256',
    })(req, res, err => {
      if (err) {
        const status = err.status || 500;
        const message = err.message || 'Sorry, we were unable to process your request.';
        return res.status(status).send({
          message,
        });
      }
      if (this.keycloakRole !== '') {
        if (!req.user.realm_access.roles.includes(this.keycloakRole)) {
          const status = 403;
          const message = 'Sorry, User not allowed to access the resource (missing: ' + this.keycloakRole + ')';
          return res.status(status).send({
            message,
          });
        }
      }
      next();
    });
  }
}
