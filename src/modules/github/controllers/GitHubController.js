const axios = require('axios');

class GitHubController {

    async getRepositories(req, res) {
        let config = {
            headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization: "Bearer " + process.env.AUTHORIZATION
            }
        }

        var repositories = [];

        var complementUrl = "orgs/bettervide/repos";

        const {
            filterName,
            archiveds,
            publicRepos,
            privateRepos,
            sortRepos,
            orderName
        } = req.query;

        if (filterName) {

            const respositorieFilterName = [];
            const response = await axios.get(process.env.URL + "user/repos", config)

            response.data.forEach(data => {
                if (data.full_name.includes(filterName)) {
                    respositorieFilterName.push(data)
                }
            });

            repositories.push(respositorieFilterName);
        }

        if (archiveds) {
            const respositorieArchived = [];
            const response = await axios.get(process.env.URL + "user/repos?visibility=public", config)

            response.data.forEach(data => {
                if (data.archived) {
                    respositorieArchived.push(data)
                }
            });

            repositories.push(respositorieArchived);
        }

        if (publicRepos) {

            const response = await axios.get(process.env.URL + "user/repos?visibility=public", config)

            repositories.push(response.data);
        }

        if (privateRepos) {

            const response = await axios.get(process.env.URL + "user/repos?visibility=private", config)

            repositories.push(response.data);
        }

        if (sortRepos) {
            const respositoriePushedAt = [];
            const response = await axios.get(process.env.URL + "user/repos?sort=pushed_at", config)

            response.data.forEach(data => {
                if (data.pushed_at) {
                    respositoriePushedAt.push(data)
                }
            });

            repositories.push(respositoriePushedAt);

        }

        if (orderName) {
            const response = await axios.get(process.env.URL + "user/repos?sort=full_name&direction=" + orderName, config)

            repositories.push(response.data);
        }

        if (!filterName && !archiveds
            && !publicRepos && !privateRepos
            && !sortRepos && !orderName) {

            const response = await axios.get(process.env.URL + complementUrl, config)
            repositories.push(response.data);
        }

        var newArray = [];
        repositories.forEach(element => {
            newArray = newArray.concat(element);
        });

        return res.status(200).json(newArray);
    }

}


module.exports = GitHubController;