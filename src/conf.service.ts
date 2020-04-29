export interface EnvConf {
  [key: string]: string;
}

export class ConfService {
  CONFIG_PATH: string;
  AUTH0_DISABLED: boolean;
  AUTH0_DOMAIN: string;
  AUTH0_AUDIENCE: string;
  ELASTICSEARCH_NODE: string;
  ELASTICSEARCH_MODULE_OPTIONS: string;

  private readonly envConf: EnvConf;

  constructor() {
    // eslint-disable-next-line
    const untildify = require('untildify');
    const defaultEnv = {
      CONFIG_DIR: '~/.config/zindexer/',
      AUTH0_DISABLED: false,
      AUTH0_DOMAIN: '',
      AUTH0_AUDIENCE: '',
      ELASTICSEARCH_NODE: 'http://127.0.0.1:9200',
      ELASTICSEARCH_MODULE_OPTIONS: '',
    };

    this.envConf = {};
    this.envConf.CONFIG_DIR =
      process.env.CONFIG_PATH === undefined ? untildify(defaultEnv.CONFIG_DIR) : untildify(process.env.CONFIG_PATH);
    this.envConf.AUTH0_DISABLED =
      process.env.AUTH0_DISABLED === undefined ? defaultEnv.AUTH0_DISABLED : JSON.parse(process.env.AUTH0_DISABLED); // Trick to convert string to boolean
    this.envConf.AUTH0_DOMAIN =
      process.env.AUTH0_DOMAIN === undefined ? defaultEnv.AUTH0_DOMAIN : process.env.AUTH0_DOMAIN;
    this.envConf.AUTH0_AUDIENCE =
      process.env.AUTH0_AUDIENCE === undefined ? defaultEnv.AUTH0_AUDIENCE : process.env.AUTH0_AUDIENCE;
    this.envConf.ELASTICSEARCH_NODE =
      process.env.ELASTICSEARCH_NODE === undefined ? defaultEnv.ELASTICSEARCH_NODE : process.env.ELASTICSEARCH_NODE;
    this.envConf.ELASTICSEARCH_MODULE_OPTIONS =
      process.env.ELASTICSEARCH_MODULE_OPTIONS === undefined
        ? defaultEnv.ELASTICSEARCH_MODULE_OPTIONS
        : process.env.ELASTICSEARCH_MODULE_OPTIONS;
  }

  get(key: string): string {
    return this.envConf[key];
  }
}
