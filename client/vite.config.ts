import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://stackoverflow.com/questions/66389043/how-can-i-use-vite-env-variables-in-vite-config-js
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const PORT = process.env.PORT;

  return defineConfig({
    base: '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    // ! doesn't work because it's impossible to set variables at build time
    // define: {
    //   VITE_BASE_API_URL: 'http://api-con:3001/api/',
    // },
    preview: {
      port: PORT,
      strictPort: true,
    },
    server: {
      port: PORT,
      strictPort: true,
      host: true,
      origin: `http://0.0.0.0:${PORT}`,
    },
  });
};
