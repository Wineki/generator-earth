import _fetch from './_fetch'

// 需要特别注意，在server端请求的时候，fetch里需要手动带上cookie
const fetchServer = {
    get: (url,
          options,
    ) => {

        const params = options || {};
        const search = Object.keys(params).map((key) => (key + '=' + encodeURIComponent(params[key]))).join('&');
        url = url + '?' + search;


        const config = {
            headers: this.ctx.headers
        };


        return new Promise((resolve, reject) => {
            _fetch('get', {
                url,
                config
            })
                .then((ret) => {
                    // todo: 记录日志等
                    resolve(ret)
                })
                .catch((ret) => {

                    // todo: 根据code判断其他操作，如登陆跳转等
                    // 如 code = 1时表示未登陆
                    // if (ret.code === 1) {
                    //     this.ctx.status = 302;
                    //     this.ctx.redirect('http://abc.com')
                    // }
                    reject(ret)
                })
        })

    },
    post: (url,
           options
    ) => {

        const body = options || {};
        const stringifyBody = JSON.stringify(body);

        const config = {
            headers: this.ctx.headers
        };

        return new Promise((resolve, reject) => {
            _fetch('post', {
                url,
                body: stringifyBody,
                config
            })
                .then((ret) => {
                    // todo: 记录日志等
                    resolve(ret)
                })
                .catch((ret) => {

                    // todo: 根据code判断其他操作，如登陆跳转等
                    // 如 code = 1时表示未登陆
                    // if (ret.code === 1) {
                    //     this.ctx.status = 302;
                    //     this.ctx.redirect('http://abc.com')
                    // }

                    reject(ret)
                })
        })


    },
    injectCtx: (ctx) => {
        // 注入ctx，方便发送请求的时候获取cookie等信息
        this.ctx = ctx
    }
};

export default fetchServer;
