import axios from 'axios';

import EnvParams from 'environment';

const connector = axios.create({
  baseURL: `${EnvParams.api}`,
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json',
  },
});

export default connector;
