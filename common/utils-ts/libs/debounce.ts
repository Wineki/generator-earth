/**
 * 截流函数
 * @param func
 * @param wait
 * @param immediate
 * @returns {Function}
 */
// @ts-ignore
export const debounce = (func, wait, immediate) => {
    // @ts-ignore
    let timeout, result;
    return function(this: void) {
        let context = this, args = arguments;
        let later = function() {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(context, args);
        return result;
    };
};
