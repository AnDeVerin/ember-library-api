import NotFoundError from './not-found';

export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    switch (err.constructor) {
      case NotFoundError:
        ctx.status = 404;

        ctx.body = {
          errors: [
            {
              code: 404,
              title: 'Not Found',
              detail: `${err.modelName} not found with the id '${err.id}'`,
            },
          ],
        };
        break;

      default:
        ctx.status = 500;

        ctx.body = {
          errors: [
            {
              code: 500,
              title: 'Internal Server Error',
              detail: err.message,
            },
          ],
        };
    }
  }
};
