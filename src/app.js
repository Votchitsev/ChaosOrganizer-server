const Koa = require('koa');
const KoaBody = require('koa-body');
const { v1: uuidv1 } = require('uuid');

const Storage = require('./Storage');

const storage = new Storage();
const app = new Koa();

app.use(KoaBody({ multipart: true }));

app.use(async (ctx, next) => {
  if (ctx.request.method !== 'OPTIONS') {
    await next();
    return;
  }
  ctx.response.set('Access-Control-Allow-Origin', '*');
  ctx.response.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type');
  ctx.response.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  ctx.response.status = 204;
});

app.use(async (ctx) => {
  ctx.response.set('Access-Control-Allow-Origin', '*');

  if (ctx.request.method === 'POST') {
    const data = ctx.request.body;
    const id = uuidv1();
    storage.addTextPost(data, id);
    ctx.status = 200;
    ctx.response.body = JSON.stringify({
      id,
    });
  }

  if (ctx.request.method === 'GET') {
    ctx.response.body = JSON.stringify(
      [...storage.getTextPostList(ctx.request.query)],
    );
  }

  if (ctx.request.method === 'DELETE') {
    const { id } = ctx.request.query;
    storage.deletePost(id);
    ctx.response.status = 200;
  }
});

app.listen(process.env.PORT || 8080);
