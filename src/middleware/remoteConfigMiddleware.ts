import ssm from '@middy/ssm'

import { updateConfig } from '../config';

const contextKey = 'remoteConfigs';

export const remoteConfigMiddleware = ({ remoteConfigName }) => {
  console.log(remoteConfigName);

  const baseMiddleware = ssm({
    fetchData: {
      [contextKey]: remoteConfigName,
    },
    cacheExpiry: 60 * 1000, // 60s
    setToContext: true,
  });

  return {
    before: async (request) => {
      const { context } = request;

      if (context[contextKey]) {
        // skip this middleware as the secrets are already cached
        return;
      }

      request.internal = {}; // FIXME

      await baseMiddleware.before(request);
      const remoteConfigs = context[contextKey];

      updateConfig(remoteConfigs);
    },
  }
};
