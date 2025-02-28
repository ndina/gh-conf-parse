const _ = require('lodash');
const removeTrailingSlash = require('remove-trailing-slash');
const { GH_GENERAL } = require('@gh-conf/gh-conf-constants');

const ParseConfig = require('./parse-config');


const userRepo = () => {
  const currConfig = ParseConfig();
  const currOrigin = _.get(currConfig, GH_GENERAL.ORIGIN_KEY);
  let currRepo = removeTrailingSlash(_.get(currOrigin, 'url'));
  if (!currRepo) {
    return undefined;
  }

  // removing .git suffix from github url in config
  currRepo = currRepo.replace('.git', '');
  
  const currRepoData = currRepo.split('/');
  return {
    repository: currRepoData[currRepoData.length - 1],
    username: currRepoData[currRepoData.length - 2],
  };
};


module.exports = userRepo;
