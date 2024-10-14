import { Client } from 'pg';

const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

const api = () => {
	Bun.serve({
		port: 8000,
		async fetch(req, server) {
			const url = new URL(req.url);
			if (url.pathname === "/favicon.ico") return new Response();

			console.log(req.method, url);
			return new Response(JSON.stringify({ sup: 'G!' }));
		},
		error(server) {
			return new Response("Oh noes!");
		},
	});

	console.log('Server started');
};

api();
