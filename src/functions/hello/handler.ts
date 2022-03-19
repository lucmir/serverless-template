import schema from './schema';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getConfig } from '../../config';
import { standardMiddleware } from "../../middleware";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const config = getConfig();
  return formatJSONResponse({
    message: `Hello, "${config.name}"! You have ${config.age} years`,
  });
};

export const main = middyfy(standardMiddleware(hello));
