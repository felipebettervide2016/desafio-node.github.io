const GitHubModule = require('./github');
const express = require('express');
const router = express.Router();
class CoreModules {

    getRoutes() {

        let gitHubModule = new GitHubModule();

        router.use('/repositories', gitHubModule.getRoutes());
        return router;
    }
}
module.exports = CoreModules;