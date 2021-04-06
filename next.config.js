/* eslint-disable @typescript-eslint/no-var-requires */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const _ = require('lodash');

module.exports = (phase, { defaultConfig }) => {
  const commonConfig = _.merge(defaultConfig, {
    poweredByHeader: false,
    future: {
      webpack5: true,
    },
  });

  /* development only config options here */
  const devOverrides = { reactStrictMode: true };

  /* config options for all phases except development here */
  const prodOverrides = {};

  const config =
    phase === PHASE_DEVELOPMENT_SERVER ? _.merge(devOverrides, commonConfig) : _.merge(prodOverrides, commonConfig);

  return config;
};
