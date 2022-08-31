const express = require('express');
const { createContainer, asClass } = require('awilix');
const CoreModules = require('./modules');
const router = express.Router();
const container = createContainer();

container.register({
    coreModules: asClass(CoreModules).singleton()
})

let coreModules = container.resolve('coreModules');
router.use('/github', coreModules.getRoutes())

module.exports = router;

