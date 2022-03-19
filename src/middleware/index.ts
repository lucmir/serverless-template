import { middlewareReducer as middleware } from 'civic-middleware-lambda';
import { remoteConfigMiddleware } from './remoteConfigMiddleware';

export const civicMiddlewares = [
  'secretsMiddleware',
];

export const middlewareConfig = {
  secretName: 'civic-pass-api',
  remoteConfigName: `lucastest-${process.env.STAGE}`,
};

export const standardMiddleware = middleware(middlewareConfig, [ remoteConfigMiddleware(middlewareConfig) ], civicMiddlewares);
