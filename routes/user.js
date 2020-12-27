import Router from 'koa-router';
import bcrypt from 'bcrypt';

const router = new Router();

router.post('/', async (ctx) => {
  const attrs = ctx.getAttributes();
  attrs.passwordHash = await bcrypt.hash(attrs.password, 10);
  const user = await ctx.app.db.User.create(attrs);

  ctx.body = ctx.app.serialize('user', user);
});

export default router.routes();
