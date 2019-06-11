//回文
export const strReverse = (str: string): string => {

    return str.split('').reverse().join('');

};
//trim
export const strTirm = (str: string): string => {

    if (typeof str !== 'string') throw new Error('strTirm arg not string');

    if (String.prototype.trim) return String.prototype.trim.call(str);
    //fallback
    return str.replace(/(^\s*)|(\s*$)/g, '');

};
//截断
export const strTrunc = (str: string, total = 10): string => {

    if (typeof str !== 'string') throw new Error('strTrunc arg not string');

    if (str.length <= total || total <= 3) return str;

    let tmplStr = str.substr(0, total-3) + '...';

    return tmplStr;

};
