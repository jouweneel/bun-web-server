import type { Server } from "bun";
import { randomUUID } from "node:crypto";

import { ApiStatus, ErrorLevels } from "../base/types";
import { ApiError } from "../base/error";
import type { ApiContext } from "../base/types";

export interface ApiConfig {
	// logger?: BaseLogger
}

export class Api {
	constructor({}: ApiConfig = {}) {

	}

	async fetch(req: Request, server: Server): Promise<Response> {
		const url = new URL(req.url);

		const context: ApiContext = {
			unix_start: Date.now(),
			unix_stop: -1,
			time_ms: -1,
			trace_id: randomUUID(),
			request: {
				body: req.body,
				headers: JSON.parse(JSON.stringify(req.headers)),
				method: req.method,
				pathname: url.pathname,
			}
		};

		try {
			// Find matching route, call with request, context & deps(?)

		} catch(e) {
			const stop = Date.now();
			context.unix_stop = stop;
			context.time_ms = stop - context.unix_start;

			throw ApiError.fromError(
				e as Error,
				{ code: 'api:unhandled-error', context }
			);
		}

		const stop = Date.now();
		context.unix_stop = stop;
		context.time_ms = stop - context.unix_start;

		throw new ApiError('api:not-found', {
			data: { method: req.method, pathname: url.pathname },
			level: ErrorLevels.Warn,
			message: `${req.method} ${url.pathname} not found!`,
			status: ApiStatus.NotFound,
			context,
		});
	}
}
