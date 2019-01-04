"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.errorRxx = errorRxx;
exports.response2xx = response2xx;
function errorRxx(response, code, status, error) {
	return response.status(code).send({
		status: status,
		error: error
	});
}

function response2xx(response, code, status, data) {
	return response.status(code).send({
		status: status,
		data: data
	});
}
//# sourceMappingURL=handlers.js.map