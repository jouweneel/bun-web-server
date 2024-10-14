import { Status, useApi } from "./api";

export function App() {
	const { request, state, setState } = useApi();


	async function load() {
		await request('/api/status', undefined, 'status');
	}

	function reset() {
		setState({ ...state, store: {}});
	}

	const loading = state.status === Status.loading;

	if (loading) return <div>Loading...</div>;

	if (state.store.status) return <div>
		<h3>Status: {JSON.stringify(state.store.status)}</h3>
		<button onClick={reset}>Reset</button>
	</div>;

	return <div>
		<h3>Howdy!</h3>
		<button onClick={load}>Load status!</button>
	</div>
}
