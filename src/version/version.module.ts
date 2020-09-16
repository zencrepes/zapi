import { Module } from '@nestjs/common';

import { ConfModule } from '../conf.module';

import VersionResolvers from './version.resolvers';

//https://stackoverflow.com/questions/58383939/nest-cant-resolve-dependencies-of-the-searchservice-please-make-sure-that
@Module({
  imports: [ConfModule.register()],
  providers: [VersionResolvers],
})
export class VersionModule {}
