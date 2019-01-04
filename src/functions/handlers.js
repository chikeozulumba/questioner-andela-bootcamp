export function errorRxx(response, code, status, error) {
	return response.status(code).send({
		status,
		error,
	});
}

export function response2xx(response, code, status, data) {
	return response.status(code).send({
		status,
		data,
	});
}
