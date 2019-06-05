let RET_DATA_KEY = 'data';
let RET_MSG_KEY = 'msg';
let RET_CODE_KEY = 'code';
const ERR_MSG = '通讯异常，请稍后重试';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        return {
            [RET_MSG_KEY]: `${ERR_MSG}：${response.status}`,
            [RET_DATA_KEY]: {},
            [RET_CODE_KEY]: 'FETCH_RESPONSE_ERROR'
        }
    }
}

function parseJSON(response) {
    if (response[RET_CODE_KEY] === 'FETCH_RESPONSE_ERROR') {
        return response
    }
    return response.json();
}

function fetchError(err) {
    return err;
}


const _fetch = (
    method,
    {
        url = '',
        body,
        config = {headers: {}}
    }
) => {

    url = `${process.env.IS_SERVER}` === 'true' ? `http://localhost:8001${url}` : `${url}`;

    return fetch(url, {
        method: method,
        headers: {
            'cache-control': 'no-cache',
            'referer-url': window.location.href,
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            ...config.headers
        },
        credentials: 'include',
        ...(body ? {body: body} : {})
    })
        .then(checkStatus)
        .then(parseJSON)
        .then((ret) => {

            if (`${ret.code}` === '0') {
                return (ret.data || {});
            } else {
                throw fetchError({
                    code: ret.code,
                    msg: ret.msg,
                    data: ret.data
                })
            }

        })
        .catch((e) => {
            throw fetchError({
                code: e.code || 'FETCH_ERROR',
                msg: e.message || e.msg || 'FETCH_ERROR',
                data: {}
            })
        });

}

export default _fetch
