import { Hono } from 'hono'

const auth = new Hono();

// console.log(Buffer.from("Hello World").toString('base64'));
// // SGVsbG8gV29ybGQ=
// console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'))
// // Hello World

auth.post(async (ctx) => {
    ctx.get('supabase').auth.signInWithPassword({ email: 'a', password: 'a' })
})


export default auth