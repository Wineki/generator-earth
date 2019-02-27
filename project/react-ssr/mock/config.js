const fs = require('fs');

const configList = [

	{

		url: '/test/listDate',
		type: 'post',
		customRouter: function (req, res) {

		    const resulteData = fs.readFileSync(__dirname + '/db/test.json', 'utf-8');

		    res.send(JSON.parse(resulteData))

		}

	},
    {

        url: '/test/aaa',
        type: 'post',
        delay: 2000,
        dataPath: '/db/delay.json'
    },
    {

        url: '/test/aaa',
        type: 'post',
        delay: 2000,
        dataPath: '/db/delay.json'
    },
    {
        url: '/simpleResponse',
        type: 'get',
        delay: 1000,
        dataPath: '/db/proxy-simpleResponse.json'
    },
    {
        url: '/wrapResponse',
        type: 'get',
        delay: 1000,
        dataPath: '/db/proxy-wrapResponse.json'
    }

];

module.exports = configList;
