import { Hono } from 'hono'

// import * as a from "./*"

const api = new Hono();

api.use("/", async (ctx, next) => {
    // ctx.get('supabase').auth.signOut()
    // console.log(ctx.req?.method)
    await next()
})

api.post("/", async (ctx) => {
    console.log(await ctx.req?.json())
    return ctx.body("ok")
})


export default api