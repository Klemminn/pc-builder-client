type EnvParams = {
  api: string;
};

const production: EnvParams = {
  api: `https://api.${window.location.host}/v1`,
};

const local: EnvParams = {
  api: 'https://api.builder.vaktin.is/v1',
};

const env = process.env.REACT_APP_ENV;

const envParams: EnvParams = env === 'production' ? production : local;

export default envParams;
