const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'lab5-zabdisalam',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

