import { Hono } from 'hono';
import { supabase } from '../supabase';
import { Database } from '../supabase_type';
import { User } from '@supabase/supabase-js';

const account = new Hono();

account.get('/', async (ctx) => {
	const { data, error } = await supabase.from('account').select('*');
	return ctx.json({ data, error });
});

account.get('/user', async (ctx) => {
	// const userId = ctx.req.param('userId');

	const user: User = (await ctx.req?.json())?.user;
	
	console.log('geted user', user.id)

	const { data, error } = await supabase.from('account').select('*').eq('user_id', user.id);
	console.log('data', data)
	return ctx.json({ data, error });
});

account.post('/', async (ctx) => {
	const user: User = (await ctx.req?.json())?.user;

	const { balance, type, currency_code, currency_num, account_name } = (await ctx.req?.json()) as any // as Database['public']['Tables']['account']['Insert'];

	// console.log(balance);
	// console.log(type);
	// console.log(currency_code);
	// console.log(currency_num);
	// console.log(account_name);
	const { data, error } = await supabase.from('account').insert({
		balance,
		type,
		currency_code,
		currency_num,
		account_name,
		user_id: user.id,
	});

	return ctx.json({ data, error });
});

account.delete(async (ctx) => {
	const { id } = (await ctx.req?.json()) as { id: number };

	const { data, error } = await supabase.from('account').delete().eq('id', id);

	return ctx.json({ data, error });
})

export default account;
