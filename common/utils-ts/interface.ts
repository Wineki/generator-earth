/**
 * 截出字符串
 */
export interface MatchSearchI {
    (search: any, reg: RegExp): any
}
/**
 * 配合fetch 格式化body
 */
export interface StringifyParamsI {
    (params: object): string
}
/**
 * 监听浏览器回退事件
 */
export type ACTIONTODO = (e: Event) => void

/**
 * 获取URL方法 参数对象
 */
export interface GetRequestParamsI {
    (query: string): {[propName: string]: any}
}
