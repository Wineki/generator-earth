const path = require('path');

module.exports = {
    output: path.resolve(__dirname, '../miniprogram/'),
    input: path.resolve(__dirname, '../src'),
    taskFnLists: ['css', 'js', 'mv'],
};
