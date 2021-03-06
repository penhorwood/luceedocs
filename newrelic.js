/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */

//Create the app name depending on the environment
var env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
var license = process.env.NEW_RELIC;

exports.config = {
  /**
   * Array of application names.
   */
  app_name : ['LuceeDocs_Node' + env],
  /**
   * Your New Relic license key.
   */
  license_key : license,
  logging : {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level : 'info'
  }
};
