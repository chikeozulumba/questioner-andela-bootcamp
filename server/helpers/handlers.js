/**
 * Returns an error response
 * @name Response4xx
 * @param {object} response
 * @param {number} code
 * @param {boolean} status
 * @param {string} error
 * @returns {object}
 */
export const errorRxx = (response, status, error) => response.status(status).json({ status, error });

/**
 * Returns a 2xx response with payload
 * @name Responnse2xx
 * @param {object} response
 * @param {number} code
 * @param {boolean} status
 * @param {array} data
 * @returns {object}
 */
export const response2xx = (response, status, data, message = null) => {
	const responseBody = { status, message, data };
	if (!message) delete responseBody.message;
	response.status(status).json(responseBody);
};

/**
 * Returns an error response
 * @name NotFound
 * @param {object} req
 * @param {object} req
 * @returns {object}
 */
export const notFound = (req, res) => {
	if (req.accepts('html')) return errorRxx(res, 404, `Error in request, '${req.path}' not found!`);
	if (req.accepts('json')) return errorRxx(res, 404, `Error in request, '${req.path}' not found!`);
	return errorRxx(res, 404, false, 'Not found');
};

/**
 * Returns default response
 * @name BaseResponse
 * @param {object} req
 * @param {object} req
 * @returns {object}
 */
export const baseResponse = (req, res) => res.status(200).json('<h1>Questioner Project</h1><br><a href="https://github.com/chikeozulumba/questioner-andela-bootcamp">Visit the Github page.</a>');
