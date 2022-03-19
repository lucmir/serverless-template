import * as R from 'ramda';

export type AppConfig = {
  name: string;
  age: number;
};

const loadStageConfig = (): Partial<AppConfig> => {
  const stage = (process.env.STAGE || 'unknown').toLowerCase();
  try {
    return require(`./${stage}`);
  } catch (error) {
    console.log(`Configurations not found for stage "${stage}", using default configs`);
  }
  return {};
};

const defaultConfig: Partial<AppConfig> = {
  name: 'Lucas',
  age: 100
};

const init = (): AppConfig => R.mergeDeepRight(defaultConfig, loadStageConfig()) as AppConfig;

let config = init();

/*
 * Update the config object.
 */
export const updateConfig = (updates: Partial<AppConfig>) => {
  config = R.mergeDeepRight(config, updates);
};

/*
 * Retrieve the config object.
 */
export const getConfig = () => config;

