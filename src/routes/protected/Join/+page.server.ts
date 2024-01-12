import { AccessToken } from "livekit-server-sdk";
import { LK_API_KEY, LK_API_SECRET } from '$env/static/private';
import { redirect } from "@sveltejs/kit";
/** @type {import('./$types').PageServerLoad} */

export const load = async (event: { locals: { getSession: () => any; }; }) => {
  const session = await event.locals.getSession();

  if (!session) {
    throw redirect(307, 'auth/signin');
  }

  const roomName = 'myroom'
  const participantName = session.user.name
  const at = new AccessToken(LK_API_KEY, LK_API_SECRET, {
    identity: participantName,
  });
  at.addGrant({ roomJoin: true, room: roomName, });
  const data = at.toJwt();
  return {
    data
  };
};


