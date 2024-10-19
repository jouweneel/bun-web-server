import type { Server } from "bun";
import { randomUUID } from "node:crypto";

import { ApiStatus, ErrorLevels } from "../base/types";
import { ApiError } from "../base/error";
import type { ApiRequest } from "../base/types";

export interface ApiConfig {
	// logger?: BaseLogger
}

export class Api {
	constructor({}: ApiConfig = {}) {

	}

	async fetch(req: Request, server: Server): Promise<Response> {
		const request = req as ApiRequest;

		request.context = {
			unix_start: Date.now(),
			unix_stop: -1,
			time_ms: -1,
			trace_id: randomUUID(),
		};

		const url = new URL(req.url);

		try {

		} catch(e) {
			const stop = Date.now();
			request.context.unix_stop = stop;
			request.context.time_ms = stop - request.context.unix_start;

			throw ApiError.fromError(
				e as Error,
				{ code: 'api:unhandled', request }
			);
		}

		const stop = Date.now();
		request.context.unix_stop = stop;
		request.context.time_ms = stop - request.context.unix_start;

		throw new ApiError('api:not_found', {
			level: ErrorLevels.Warn,
			message: `${request.method} ${url.pathname} not found!`,
			request,
			status: ApiStatus.NotFound,
		});
	}
}
