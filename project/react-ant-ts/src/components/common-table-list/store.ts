/**
 * Created by Chuans on 2019/2/21
 * Author: Chuans
 * Github: https://github.com/chuans
 * Time: 8:38 PM
 */
import { action, observable } from 'mobx';
import { message } from 'antd';
import { RequestParams, ResultParams, AllDataSourceParams } from 'ROOT_SOURCE/interface/common';
import request from 'ROOT_SOURCE/utils/request';

class TableStore {
    /**
     * 用来保存所有页面内容 如果正常不建议开启此配置 详情请查看当前目录下的interface文件
     * 默认关闭
     */
    @observable allPageContainer: any = {};

    /**
     * 存放所有的数据源
     */
    @observable allDataSource: any = {};


    /**
     * 用来保存所有请求数据相关的url 和 type
     */

    @observable allRequestInfo: any = {};

    /**
     * 当前加载状态
     */
    @observable isLoading: boolean = false;

    /**
     * 获取数据主方法
     * @desc 参数详情 请查看RequestParams
     */
    @action
    async getData({url, type, sourceId, params = {}, headers = {}}: RequestParams): Promise<any> {

        const info: AllDataSourceParams = this.allDataSource[sourceId];

        // 如果没传参数 则吧默认值传进去
        params = {
            pageSize: info.pageSize,
            pageNo: info.pageNo,
            ...params
        }

        this.isLoading = true;

        const result: ResultParams = await request[type](url, params, headers);

        this.setState({isLoading: false});

        // 值不存在的时候
        if (!result) {
            return message.error('请求异常');
        }

        // 当code 为其他值 请求失败的时候
        if (result.code !== 0) {
            return message.error(result.msg);
        }

        this.setDataSource(sourceId, {
            ...result.data,
            ...params,
        });

        // 设置请求相关的url 和 type
        if (!this.allRequestInfo[sourceId]) {
            this.setSubState('allRequestInfo', sourceId, {url, type});
        }

        return result;
    }

    /**
     * 设置二级state
     */
    @action.bound
    setSubState(key1, key2, value) {
        this[key1][key2] = value;
    }


    @action.bound
    setState(obj: Object) {
        for (const key in obj) {
            this[key] = obj[key];
        }
    }

    /**
     * 这里设置异步修改的资源
     * @param sourceId
     * @param data
     */
    @action.bound
    setDataSource(sourceId: string | number, data = {}) {
        const _data: AllDataSourceParams = {
            ...this.allDataSource[sourceId],
            ...data
        };

        this.allDataSource[sourceId] = _data;
    }

    /**
     *  =======================================
     *  ==  以下方法提供给外部，进行特殊操作时使用  ==
     *  =======================================
     */

    /**
     * 通过sourceid获取当前的数据 包括分页信息 搜索表单
     * @param sourceId
     */
    @action getRequestInfoBySourceId(sourceId: string | number) {
        return this.allDataSource[sourceId];
    }

    /**
     * 获取当前请求的类型和url
     * @param sourceId
     */
    @action getRequestTypeAndUrlBySourceId(sourceId: string | number) {
        return this.allRequestInfo[sourceId];
    }

    /**
     * 更新当前数据，根据额外参数用来控制是否根据当前的条件获取数据
     * @param sourceId 当前的sourceid
     */
    @action
    async updateData(sourceId: string, params = {}) {
        const _ps = Object.assign({params, sourceId}, this.allRequestInfo[sourceId]);

        return await this.getData(_ps);
    }

    /**
     * 添加页面内容
     * @param sourceId
     * @param Container
     */
    @action setContainerInfo(sourceId: string, Container) {
        this.allPageContainer[sourceId] = Container;
    }

    /**
     * 获取页面内容
     * @param sourceId
     * @param Container
     */
    @action getContainerInfo(sourceId: string) {
        return this.allPageContainer[sourceId];
    }

    /**
     * 手动切换loading状态
     */

    @action.bound
    setLoading(state = false) {
        this.isLoading = state;
    }

}


export default new TableStore();
