import { Hono } from 'hono';
import { supabase } from '../supabase';
import { User } from '@supabase/supabase-js';

const apiUser = new Hono();

apiUser.get(async (ctx) => {
	console.log('apiUser getted');
	// console.log(await ctx.req?.json());
	const { user } = await ctx.req?.json();
	console.log(user);

	return ctx.json((await ctx.req?.json()).user as User);
});

export default apiUser;
