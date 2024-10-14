import { useState } from "react";

export enum Status {
	idle = 'idle',
	loading = 'loading',
}

export const useApi = () => {
	const [ state, setState ] = useState({
		status: Status.idle,
		error: null as string | null,
		store: {} as Record<string,unknown>,
	});

	async function request<Output = unknown>(
		url: string, req?: RequestInit, storeKey?: string
	) {
		setState({ ...state, status: Status.loading, error: null });

		try {
			const response = await fetch(url, req);
			const result = await response.json();
	
			const nextState = { ...state, status: Status.idle, error: null };
			if (storeKey) {
				nextState.store = { ...state.store, [storeKey]: result };
			}

			setState(nextState);

			return result as Output;
		} catch(e) {
			const err = e as Error;
			setState({ ...state, status: Status.idle, error: err?.message });
		}
	}

	return {
		state,
		setState,
		request,
	}
}
