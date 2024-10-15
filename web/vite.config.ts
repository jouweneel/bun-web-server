import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// @ts-ignore - dumb check to see if this is docker
const isDocker = process.env.HOME === '/root';

const serverHost = isDocker ? '0.0.0.0' : 'localhost';
const apiHost = isDocker ? 'server' : 'localhost';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
	server: {
		host: serverHost,
		port: 5173,
		proxy: {
			'/api': {
				target: `http://${apiHost}:8000`,
				xfwd: true,
			}
		}
	}
});
