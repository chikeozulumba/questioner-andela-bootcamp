import express from 'express';
import v1 from './v1';

const Router = express.Router();
// Create Versioning for Child routes -- v*
Router.use('/v1', v1);

// Export Base Router
export default Router;
