const errorRxx = (response, code, status, error) => response.status(code).send({
	status,
	error,
});

const response2xx = (response, code, status, data) => response.status(code).send({
	status,
	data,
});

const notFound = (req, res, next) => {
	// respond with html page
	if (req.accepts('html')) return errorRxx(res, 404, false, 'Not found');

	// respond with json
	if (req.accepts('json')) return errorRxx(res, 404, false, 'Not found');

	// default to plain-text. send()
	return errorRxx(res, 404, false, 'Not found');
};

const baseResponse = (req, res) => res.status(200).send('<h1>Questioner Project</h1><br><a href="https://github.com/chikeozulumba/questioner-andela-bootcamp">Visit the Github page.</a>');
