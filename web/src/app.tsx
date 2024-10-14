import { useEffect } from "react";

import { Status, useApi } from "./api";

export function App() {
	const { request, status } = useApi();

	async function initialize() {
		const res = await request('/api/status');
		console.log('RES', res);
	}

	useEffect(() => {
		initialize();
	}, []);

	const loading = status === Status.loading;

	return loading ? <div>Loading...</div> : <div>Howdy!</div>;
}
