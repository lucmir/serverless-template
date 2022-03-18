import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: 'myservice',
  frameworkVersion: '3',
  plugins: [
    'serverless-webpack',
    'serverless-offline',
    'serverless-plugin-warmup',
    'serverless-prune-plugin',
    'serverless-dotenv-plugin',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { hello },
  package: { individually: true },
  custom: {
    defaultStage: 'local',
    stage: '${opt:stage, self:custom.defaultStage}',
    // serverless-webpack
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: {
        forceExclude: ['aws-sdk'],
      },
      packager: 'yarn',
      packagerOptions: {
        // needed for yarn to support allowlists in the webpack nodeExternals config
        noFrozenLockfile: true,
        scripts: ['rm -rf node_modules/aws-sdk'],
      },
    },
    // serverless-plugin-warmup
    warmup: {
      default: {
        enabled: true,
      },
    },
    // serverless-prune-plugin
    prune: {
      automatic: true,
      number: 3,
    },
  },
};

module.exports = serverlessConfiguration;
