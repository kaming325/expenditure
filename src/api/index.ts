import { Hono } from 'hono';
import { supabase } from '../supabase';
import apiUser from './user';

const api = new Hono();

api.use('/*', async (ctx, next) => {
	// const supabase = ctx.get('supabase');
	const auth_header = ctx.req.header('authorization');

	if (!auth_header) {
		return ctx.json({ error: 'no valid user session token' }, 401);
	}

	const [tokenType, sessionToken] = auth_header?.split(' ');

	if (tokenType !== 'Bearer') {
		return ctx.json({ error: 'this end point require Bearer token' }, 401);
	}

	const { data, error } = await supabase.auth.getUser(sessionToken);

	if (error) {
		return ctx.json({ error: error!.message }, error?.status as any);
	}

	// if (data.user) console.log('auth!!!!');

	ctx.req.bodyCache.json = {
		...((await ctx.req.json()) ?? {}),
		user: data.user,
	};
	// console.log(await ctx.req.json());
	await next();
});

api.post('/', async (ctx) => {
	console.log(await ctx.req?.json());
	// return ctx.json(await ctx.req?.json());
	return ctx.body('ok');
});

api.route('/user', apiUser);

export default api;
