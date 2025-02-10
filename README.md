# lod

This project is built using Vue and relies on Firebase for authentication and an external API for additional functionality (fetching energy data). Below are the steps required to set up and run the project locally.

## Project Setup

```sh
npm install
```

## Environment Variables

To run the project locally, you need to create a `.env` file in the root of the project and configure the following environment variables:

````env
VITE_API_URL=
VITE_API_KEY=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
````

### Compile and Hot-Reload for Development

```sh
npm run dev
````

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### AI Tools Used
GitHub Copilot, OpenAI ChatGPT, and Figma Builder.io Plugin
