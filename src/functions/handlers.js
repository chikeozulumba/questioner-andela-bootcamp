export function error4xx(response, code, status, message) {
	return response.status(code).send({
		status,
		error: {
			message,
		},
	});
}

export function error5xx(response, code, status, message) {
	return response.status(code).send({
		status,
		error: {
			message,
		},
	});
}

export function response2xx(response, code, status, data) {
	return response.status(code).send({
		status,
		data,
	});
}
