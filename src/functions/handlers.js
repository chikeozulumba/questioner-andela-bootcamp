export function error4xx(response, code, status, error) {
	return response.status(code).send({
		status,
		error,
	});
}

export function error5xx(response, code, status, error) {
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
