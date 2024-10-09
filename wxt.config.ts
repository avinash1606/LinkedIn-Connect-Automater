import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'LinkedIn Connection Automator', // Change this to your desired name
    version: '1.0.0',
    description: 'Automates sending connection requests on LinkedIn',
    manifest_version: 3,
  },
});
