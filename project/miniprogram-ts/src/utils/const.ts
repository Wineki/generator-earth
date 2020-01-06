
const PREFIX: string = '';

// const DOMAIN:string = 'http://192.168.14.247:8001';
// const PREFIX: string = 'miniProgramApi';

interface IApiEnum {
    readonly DETAIL: string,
    readonly LIST: string,
}

const API:IApiEnum = {
    DETAIL: `/${PREFIX}/caseOrder/getCaseOrder`,
    LIST: `/${PREFIX}/caseOrder/getCaseOrderByPage`,
};

export {
    API,
};
