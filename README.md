# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

Configure env variables
1. Create .env file in root

Untuk memudahkan recruiter, saya mengirimkan sekalian dengan .env
```bash
AUTH_SECRET="abcdefghijklmnopqrstuvwxyz123456"

GOOGLE_CLIENT_ID="1023155458771-6udtrckmg0ksf0rt8ti2i2n8u86qmtrd.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"

MONGODB_CONNECTION_STRING='mongodb+srv://asdf:asdf@cluster0.x4cjrx2.mongodb.net/?retryWrites=true&w=majority'

LK_API_KEY="APIK2imsq9rVRhM"
LK_API_SECRET="mulwK8SNePxlcOF09CH0nP0fWrtPA6PVefX4q42JZbLC"
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
