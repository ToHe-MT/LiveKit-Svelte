import { AccessToken, RoomServiceClient, Room } from "livekit-server-sdk";
import { LK_API_KEY, LK_API_SECRET } from '$env/static/private';
import { redirect } from "@sveltejs/kit";
/** @type {import('./$types').PageServerLoad} */

// const createToken = () => {
//   const roomName = 'quickstart-room'
//   const participantName = 'quickstart-username';
//   const at = new AccessToken(LK_API_KEY, LK_API_SECRET, {
//     identity: participantName,
//   });
//   at.addGrant({ roomJoin: true, room: roomName });

//   return at.toJwt();
// }

// const createRoom = () => {
//   const livekitHost = 'https://my.livekit.host';
//   const roomService = new RoomServiceClient(livekitHost, LK_API_KEY, LK_API_SECRET);

//   roomService.listRooms().then((rooms: Room[]) => {
//     if (rooms) {
//       return;
//     } else {
//       const opts = {
//         name: 'myroom',
//         emptyTimeout: 10 * 60, // 10 minutes
//         maxParticipants: 20,
//       };
//       roomService.createRoom(opts).then((room: Room) => {
//         console.log('room created', room);
//       });
//     }
//   });
// }
export const load = async (event: { locals: { getSession: () => any; }; }) => {
  const session = await event.locals.getSession();

  if (!session) {
    throw redirect(307, 'auth/signin');
  }

  const livekitHost = 'wss://sattest-qx98pryz.livekit.cloud';
  const roomService = new RoomServiceClient(livekitHost, LK_API_KEY, LK_API_SECRET);
  
  roomService.listRooms().then((rooms: Room[]) => {
    if (!rooms) {
      const opts = {
        name: 'myroom',
        emptyTimeout: 10 * 60, // 10 minutes
        maxParticipants: 20,
      };
      roomService.createRoom(opts).then((room: Room) => {
        console.log('room created', room);
      });
    }
  });

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


