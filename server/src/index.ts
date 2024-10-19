import { Api } from '../@bw/api';
import { ApiError } from '../@bw/base/error';
import { TagLogger } from '../@bw/base/logger';
import { type ApiRequest } from '../@bw/base/types';

const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

const apiLogger = new TagLogger('server/api');
const serverLogger = new TagLogger('server/main');

const api = new Api();

async function main() {
	Bun.serve({
		port: 8000,
		async fetch(req, server) {
			const response = await api.fetch(req, server);

			const request = req as ApiRequest;
			const time = request.context.time_ms;
			apiLogger.info(`[${response.status}] ${req.method} ${req.url} (${time}ms)`);

			return response;
		},
		error(e, ...args) {
			const error = e as ApiError;
			apiLogger.error(error);

			const response = error.response;
	
			return Response.json(response.json, { status: response.status });
		},
	});
	
	serverLogger.log("Started");
}
main();
