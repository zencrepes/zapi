import { Logger } from '@nestjs/common';

import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as jsYaml from 'js-yaml';
import * as loadYamlFile from 'load-yaml-file';
import * as path from 'path';

import { zencrepesConfig, defaultConfig } from '@bit/zencrepes.zindexer.config';

export interface EnvConf {
  [key: string]: string;
}

export class ConfService {
  private readonly logger = new Logger(ConfService.name);

  CONFIG_PATH: string;
  KEYCLOAK_DISABLED: boolean;
  KEYCLOAK_REALM: string;
  KEYCLOAK_AUTH_SERVER_URL: string;
  KEYCLOAK_AUDIENCE: string;
  KEYCLOAK_ROLE: string;

  private readonly envConfig: EnvConf;
  private userConfig: zencrepesConfig;

  constructor() {
    // Initialize config directory:

    // eslint-disable-next-line
    const untildify = require('untildify');
    const defaultEnv = {
      CONFIG_DIR: '~/.config/zindexer/',

      KEYCLOAK_DISABLED: false,
      KEYCLOAK_REALM: 'ZenCrepes',
      KEYCLOAK_AUTH_SERVER_URL: 'http://localhost:8080/auth/',
      KEYCLOAK_AUDIENCE: '',
      KEYCLOAK_ROLE: '',
    };

    this.envConfig = {};
    this.envConfig.CONFIG_DIR =
      process.env.CONFIG_PATH === undefined ? untildify(defaultEnv.CONFIG_DIR) : untildify(process.env.CONFIG_PATH);
    this.envConfig.KEYCLOAK_DISABLED =
      process.env.KEYCLOAK_DISABLED === undefined
        ? defaultEnv.KEYCLOAK_DISABLED
        : JSON.parse(process.env.KEYCLOAK_DISABLED); // Trick to convert string to boolean
    this.envConfig.KEYCLOAK_REALM =
      process.env.KEYCLOAK_REALM === undefined ? defaultEnv.KEYCLOAK_REALM : process.env.KEYCLOAK_REALM;
    this.envConfig.KEYCLOAK_AUDIENCE =
      process.env.KEYCLOAK_AUDIENCE === undefined ? defaultEnv.KEYCLOAK_AUDIENCE : process.env.KEYCLOAK_AUDIENCE;
    this.envConfig.KEYCLOAK_ROLE =
      process.env.KEYCLOAK_ROLE === undefined ? defaultEnv.KEYCLOAK_ROLE : process.env.KEYCLOAK_ROLE;
    this.envConfig.KEYCLOAK_AUTH_SERVER_URL =
      process.env.KEYCLOAK_AUTH_SERVER_URL === undefined
        ? defaultEnv.KEYCLOAK_AUTH_SERVER_URL
        : process.env.KEYCLOAK_AUTH_SERVER_URL;

    // Look for configuration file or initialize if it couldn't find any
    fse.ensureDirSync(this.envConfig.CONFIG_DIR);
    fse.ensureDirSync(this.envConfig.CONFIG_DIR + '/cache/');

    if (!fs.existsSync(path.join(this.envConfig.CONFIG_DIR, 'config.yml'))) {
      fs.writeFileSync(path.join(this.envConfig.CONFIG_DIR, 'config.yml'), jsYaml.safeDump(defaultConfig));
      this.logger.error(
        'Initialized configuration file with defaults in: ' + path.join(this.envConfig.CONFIG_DIR, 'config.yml'),
      );
      this.logger.error('Please EDIT the configuration file first');
      return process.exit(1);
    } else {
      this.logger.log('Configuration file exists: ' + path.join(this.envConfig.CONFIG_DIR, 'config.yml'));

      const userConfig = loadYamlFile.sync(path.join(this.envConfig.CONFIG_DIR, 'config.yml'));
      this.setUserConfig(userConfig);
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  getUserConfig(): zencrepesConfig {
    return this.userConfig;
  }

  setUserConfig(userConfig: zencrepesConfig) {
    this.userConfig = userConfig;
  }
}
