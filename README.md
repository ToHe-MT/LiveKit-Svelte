# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

Configure env variables
1. Create .env file in root

To Help Recruitment Process, I include the .env
```bash
AUTH_SECRET=<32CharLONG>

GOOGLE_CLIENT_ID=<GET FROM OAUTH API GOOGLE>
GOOGLE_CLIENT_SECRET=<GET FROM OAUTH API GOOGLE>

MONGODB_CONNECTION_STRING=<Your MongoDB Server>

LK_API_KEY=<GET FROM LIVEKIT API>
LK_API_SECRET=<GET FROM LIVEKIT API>
```

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
