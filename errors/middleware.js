import { ValidationError, UniqueConstraintError } from 'sequelize';
import { underscore, dasherize } from 'inflected';
import NotFoundError from './not-found';
import UnauthorizedError from './unauthorized';
import ForbiddenError from './forbidden';

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

      case ForbiddenError:
        ctx.status = 403;
        ctx.body = {
          errors: [
            {
              status: 403,
              title: 'Forbidden',
              detail: 'User does not have access to edit this resource',
            },
          ],
        };
        break;

      case UnauthorizedError:
        ctx.status = 401;
        ctx.body = {
          errors: [
            {
              status: 401,
              title: 'Unauthorized',
              detail: err.message,
            },
          ],
        };
        break;

      case UniqueConstraintError:
      case ValidationError:
        ctx.status = 422;
        ctx.body = {
          errors: err.errors.map((valError) => {
            const attr = dasherize(underscore(valError.path));
            const title =
              valError.validatorKey === 'notEmpty'
                ? `${attr} can't be blank`
                : valError.message;

            return {
              status: 422,
              code: 100,
              title,
              source: {
                pointer: `/data/attributes/${attr}`,
              },
            };
          }),
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
