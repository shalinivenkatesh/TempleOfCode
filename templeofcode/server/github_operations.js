var GithubApi = Npm.require("octonode");
var client = GithubApi.client();

function _searchRepos(arg, callback) {
  client.search().repos(arg, callback);
}

var wrappedSearchRepos = Meteor.wrapAsync(_searchRepos);

Meteor.methods({
  getIssuesForRepo: function(repoUsername, repoName) {
  },

  searchRepos: function(query, page) {
    return wrappedSearchRepos({q: query, page: page});
  }
});

