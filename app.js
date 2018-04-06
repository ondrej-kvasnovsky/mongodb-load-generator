const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')

const app = new Koa()
app.use(koaBody())
const router = new Router()

const LoadGenerator = require('./load-generator')
const generator = new LoadGenerator()

router.get('/:id', (ctx, next) => {
  const result = []
  const keys = generator.tasks.keys()
  for (const key of keys) {
    result.push(key)
  }
  ctx.body = JSON.stringify(result)
})

router.post('/:id', (ctx, next) => {
  const definition = JSON.parse(ctx.request.body)

  generator.start(ctx.params.id, definition)
  ctx.body = 'started'
})

router.delete('/:id', (ctx, next) => {
  generator.stop(ctx.params.id)
  ctx.body = 'removed'
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(4444, () => console.log('Started: http://localhost:4444'))
