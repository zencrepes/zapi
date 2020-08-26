import { NestMiddleware, Injectable } from '@nestjs/common';
import * as jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { ConfService } from '../conf.service';
import { zencrepesConfig } from '@bit/zencrepes.zindexer.config';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  keycloakRealm: string;
  keycloakAuthServerUrl: string;
  keycloakAudience: string;
  keycloakRole: string;
  userConfig: zencrepesConfig;

  constructor(config: ConfService) {
    this.keycloakRealm = config.get('KEYCLOAK_REALM');
    this.keycloakAuthServerUrl = config.get('KEYCLOAK_AUTH_SERVER_URL');
    this.keycloakAudience = config.get('KEYCLOAK_AUDIENCE');
    this.keycloakRole = config.get('KEYCLOAK_ROLE');
    this.userConfig = config.getUserConfig();
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
      let userAuthorized = false;
      if (this.userConfig.auth.domainCheck.enabled === true) {
        const passDomains = this.userConfig.auth.domainCheck.domains.filter((d: string) => req.user.email.includes(d));
        if (passDomains.length > 0) {
          userAuthorized = true;
        }
      }

      if (this.keycloakRole !== '') {
        if (!req.user.realm_access.roles.includes(this.keycloakRole) && userAuthorized === false) {
          const status = 403;
          const message = 'Sorry, User not allowed to access the resource (missing: ' + this.keycloakRole + ')';
          return res.status(status).send({
            message,
          });
        } else {
          userAuthorized = true;
        }
      }
      if (userAuthorized === false) {
        const status = 403;
        const message =
          'Sorry, User not allowed to access the resource (unauthorized domain for: ' + req.user.email + ')';
        return res.status(status).send({
          message,
        });
      }
      next();
    });
  }
}
