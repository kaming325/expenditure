import { Hono } from 'hono';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { supabase, setSupabase } from './supabase'
import api from './api';
import auth from './auth';

const app = new Hono();

app.use(async (ctx, next) => {
	// if (!ctx.get('supabase')) {
	if (!supabase) {
		const supabaseUrl = ctx.env?.['SUPABASE_API_ENDPOINT'];
		const supabaseKey = ctx.env?.['SUPABASE_CLIENT_API_KEY'];
		// const supabase = createClient(supabaseUrl, supabaseKey);
		const supabaseInstance = setSupabase(supabaseUrl, supabaseKey);
		if (!supabaseInstance) {
			return ctx.json({ error: 'supabase client init failed' }, 500);
		}
		console.log('supabase client init!');
		// ctx.set('supabase', createClient(supabaseUrl, supabaseKey));
	}
	await next();
});

app.all('/', (ctx) => ctx.json({ error: 'not found' }, 404));


app.post('/signUp', async (ctx) => {
	// const supabase = ctx.get('supabase');
	const { email, password } = await ctx.req.json();
	const { data, error } = await supabase.auth.signUp({
		email,
		password
	});
	return ctx.json({ data, error }, )
	// 	undefined, {
	// 	"Content-Type": 'application/json'
	// });
})


app.route('/auth', auth);

app.route('/api', api);

export default app;

// declare module 'hono' {
// 	interface ContextVariableMap {
// 		supabase: SupabaseClient;
// 	}
// }
