const routes = module.exports = require('next-routes')()

routes
  .add('tx', '/tx/:txHash', 'tx')
  .add('address', '/address/:address', 'address')