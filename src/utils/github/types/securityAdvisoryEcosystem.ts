import { registerEnumType } from '@nestjs/graphql';

export enum SecurityAdvisoryEcosystem {
  COMPOSER = 'COMPOSER',
  MAVEN = 'MAVEN',
  NPM = 'NPM',
  NUGET = 'NUGET',
  PIP = 'PIP',
  RUBYGEMS = 'RUBYGEMS',
}

registerEnumType(SecurityAdvisoryEcosystem, {
  name: 'SecurityAdvisoryEcosystem',
  description:
    'The possible ecosystems of a security vulnerability package.',
});
