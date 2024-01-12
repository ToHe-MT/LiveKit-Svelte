import { redirect } from '@sveltejs/kit';
/** @type {import('./$types').LayoutServerLoad} */

export const load = async (event: { locals: { getSession: () => any; }; }) => {
  const session = await event.locals.getSession();

  if (!session) {
    throw redirect(307, 'auth/signin');
  }
  return {
      session
  };
};