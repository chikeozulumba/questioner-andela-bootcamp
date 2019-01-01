export default function errorFields(response, code, status, message) {
	return response.status(code).send({
		status,
		error: {
			message,
		},
	});
}
