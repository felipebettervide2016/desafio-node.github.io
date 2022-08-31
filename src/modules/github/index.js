const express = require('express');
const GitHubController = require('./controllers/GitHubController')
const router = express.Router();
class GitHubModule {
    constructor() {
        this.gitHubController = new GitHubController();
    }

    getRoutes() {
        let gitHubController = this.gitHubController;
        router.get('/', gitHubController.getRepositories);
        return router;
    }
}

module.exports = GitHubModule;