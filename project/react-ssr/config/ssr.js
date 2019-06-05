const path = require('path');
module.exports = {
    appEntry: {
        "index": path.resolve('src/pages/index/indexSSR'),
        "account": path.resolve('src/pages/account/indexSSR')
    },
};
