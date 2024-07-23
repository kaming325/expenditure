import { Hono } from 'hono';
import { supabase } from '../supabase';
import { Database } from '../supabase_type';
import { User } from '@supabase/supabase-js';

const transaction = new Hono();

transaction.get('/', async (ctx) => {
	const { data, error } = await supabase.from('account').select('*');
	return ctx.json({ data, error });
});

// transaction.get('/user', async (ctx) => {
// 	// const userId = ctx.req.param('userId');

// 	const user: User = (await ctx.req?.json())?.user;

// 	console.log('geted user', user.id)

// 	const { data, error } = await supabase.from('account').select('*').eq('user_id', user.id);
// 	console.log('data', data)
// 	return ctx.json({ data, error });
// });

transaction.post('/', async (ctx) => {
	const user: User = (await ctx.req?.json())?.user;

	const { account, category, delta, detail, remark } = (await ctx.req?.json()) as any; // as Database['public']['Tables']['account']['Insert'];
	// const abc = (await ctx.req?.json()) as any // as Database['public']['Tables']['account']['Insert'];

	// console.log('abc', abc)
	// {
	//     account: selectedAccount?.value?.id,
	//     category: selectedCategory?.value,
	//     delta: isIncome.value ? -delta.value : delta.value,
	//     remark: remark.value,
	//     detail: detail.value,
	//   }

	const { data, error } = await supabase.from('transaction').insert({
		account,
		category,
		delta,
		detail,
		remark,
	});

	return ctx.json({ data, error });
});

transaction.delete(async (ctx) => {
	const { id } = (await ctx.req?.json()) as { id: number };

	const { data, error } = await supabase.from('account').delete().eq('id', id);

	return ctx.json({ data, error });
});

export default transaction;
