/**
 * 请求需要的参数说明
 */
export interface RequestParams {
    // 请求地址
    url: string;
    // 请求类型
    type: string;
    // 用于存放单个组件的值
    sourceId: string | number;
    // 请求参数
    params?: object | any;
    // 自定义headers
    headers?: object | any
}

/**
 * 请求回调参数
 */
export interface ResultParams {
    code: number;
    data: any;
    msg: string;
}



