type EnvParams = {
  api: string;
};

const production: EnvParams = {
  api: 'https://api.jofnumokkur.xyz/v1',
};

const local: EnvParams = {
  api: 'http://127.0.0.1:8000/v1',
};

// const env = process.env.REACT_APP_ENV
const env = 'production';

const envParams: EnvParams = env === 'production' ? production : local;

export default envParams;
