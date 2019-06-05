const fs = require('fs');

const configList = [

	{

		url: '/test/listDate',
		type: 'post',
        delay: 2000,
		customRouter: function (req, res) {

		    const resulteData = fs.readFileSync(__dirname + '/db/test.json', 'utf-8');

		    setTimeout(() => [
                res.send(JSON.parse(resulteData))
            ], 2000)

		}

	},
    {

        url: '/test/myData',
        type: 'get',
        delay: 2000,
        dataPath: '/db/myData.json'
    },
];

module.exports = configList;
