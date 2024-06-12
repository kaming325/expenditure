import { Hono } from 'hono';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import api from './api';
import auth from './auth';

const app = new Hono();

app.use(async (ctx, next) => {
	if (!ctx.get('supabase')) {
		const supabaseUrl = ctx.env?.['SUPABASE_API_ENDPOINT'];
		const supabaseKey = ctx.env?.['SUPABASE_CLIENT_API_KEY'];
		ctx.set('supabase', createClient(supabaseUrl, supabaseKey));
	}
	await next();
});

app.all('/', (ctx) => ctx.json({ error: 'not found' }, 404));

app.route('/auth', auth);
app.route('/api', api);

export default app;

declare module 'hono' {
	interface ContextVariableMap {
		supabase: SupabaseClient;
	}
}
