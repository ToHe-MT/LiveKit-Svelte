import { redirect, type Actions } from "@sveltejs/kit";

export const load = async (event: {
	cookies: any; locals: { getSession: () => any; };
}) => {
	const session = await event.locals.getSession();
	const cookies = event.cookies.getAll()
	if (session) {
		cookies.forEach((cookie: { name: any; }) => {
			event.cookies.delete(cookie.name, { path: '/' });
		})
		throw redirect(302, "/");
	}
};