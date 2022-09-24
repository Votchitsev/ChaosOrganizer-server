const Koa = require('koa');
const KoaBody = require('koa-body');

const Storage = require('./Storage');

const storage = new Storage();
const app = new Koa();

app.use(KoaBody());

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
    const data = ctx.request.body.content.text;
    storage.addTextPost(data);
    ctx.response.ok = true;
  }

  if (ctx.request.method === 'GET') {
    ctx.response.body = JSON.stringify(
      [...storage.getTextPostList()],
    );
  }
});

app.listen(8080);
