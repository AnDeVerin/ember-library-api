import { mapKeys, mapValues } from 'lodash';
import { camelize, underscore } from 'inflected';

export default async (ctx, next) => {
  ctx.getAttributes = () => {
    const { data } = ctx.request.body;
    let { attributes, relationships } = data;

    attributes = mapKeys(attributes, (_, key) =>
      camelize(underscore(key), false),
    );

    relationships = mapKeys(relationships, (_, key) =>
      camelize(underscore(`${key}-id`)),
    );
    relationships = mapValues(relationships, (value) => value.data.id);

    return {
      ...relationships,
      ...attributes,
    };
  };

  await next(ctx);
};
