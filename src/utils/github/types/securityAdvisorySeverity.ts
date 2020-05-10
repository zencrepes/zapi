import { registerEnumType } from '@nestjs/graphql';

export enum SecurityAdvisorySeverity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  LOW = 'LOW',
  MODERATE = 'MODERATE',
}

registerEnumType(SecurityAdvisorySeverity, {
  name: 'SecurityAdvisorySeverity',
  description:
    'The severity of the advisory',
});
