import _fetch from './_fetch'


/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default {
    get: function(url, options) {
        let params = "?";
        for(let key in options) {
            if(options[key]){
                params += key + "=" + options[key] + "&";
            }
        }
        return _fetch('get', {
            url: url + params,
        });
    },
    post: function(url, options) {

        return _fetch('post', {
            url: url,
            body: JSON.stringify(options)
        })
    },
}
