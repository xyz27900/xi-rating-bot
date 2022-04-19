const environments = ['development', 'staging', 'production'] as const;
type Environment = typeof environments[number];

const getEnvironment = (): Environment => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development' || NODE_ENV === 'staging' || NODE_ENV === 'production') {
    return NODE_ENV;
  } else {
    return 'development';
  }
};

export const NODE_ENV = getEnvironment();
export const isDevelopment = NODE_ENV === 'development';
export const isProduction = NODE_ENV === 'production';
