/**
 * Created by Chuans on 2019/2/21
 * Author: Chuans
 * Github: https://github.com/chuans
 * Time: 3:36 PM
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import { Form, Spin } from 'antd';
import { Props } from './interface';
import { Pagination, RequestParams, ResultParams } from 'ROOT_SOURCE/interface/common';
import { getUUID } from 'ROOT_SOURCE/utils'
import Store from './store';
// import {toJS} from 'mobx';


export let INIT_PAGINATION: Pagination = {
    pageSize: 10,
    pageNo: 1,
};


@observer
class CommonTableList extends React.Component<Props> {
    FormTableList: any;

    constructor(props: Props) {
        super(props);

        this.setFormTableList();

    }

    setFormTableList() {
        const {FT, sourceId, isSaveAllPage, pagination: initPagination} = this.props;
        // 设置默认页码参数
        const pagination: Pagination = INIT_PAGINATION = initPagination as Pagination;

        this.FormTableList = Form.create()(FT);

        // 初始化相应的数据 、、页码
        Store.setDataSource(sourceId as string, {
            list: [],
            ...pagination
        });

        if (isSaveAllPage) {
            Store.setContainerInfo(sourceId as string, this.FormTableList);
        }

        return this.FormTableList;
    }

    getData = async (params = {}) => {
        const {url, sourceId, type, extraParams = {}} = this.props;

        params = {...params, ...extraParams};

        const result: ResultParams = await Store.getData({url, sourceId, params, type} as RequestParams);

        return result;
    }

    /**
     * 当开启保存所有内容的时候使用此渲染
     */
    renderSaveAllPage(): React.ReactNode {
        const {sourceId} = this.props;
        const pps = {
            sourceId,
            store: Store,
            getData: this.getData,
        }

        let Container = Store.getContainerInfo(sourceId as string);
        // 这个时候需要判断  当前存不存在对应的内容  不存在则需要创建
        // console.log(toJS(Store));

        if (Container) {
            return <Container {...pps}/>
        }

        Container = this.setFormTableList();


        return <Container {...pps}/>
    }

    render() {
        const {isShowLoading, isSaveAllPage, sourceId} = this.props;
        const isLoading: boolean = isShowLoading ? Store.isLoading : false


        if (isSaveAllPage) {
            return (
                <Spin spinning={isLoading}>
                    {this.renderSaveAllPage()}
                </Spin>
            )
        }

        if (Store.allDataSource && !Store.allDataSource[sourceId as string]) {
            return null;
        }


        return (
            <Spin spinning={isLoading}>
                <this.FormTableList
                    sourceId={this.props.sourceId}
                    store={Store}
                    getData={this.getData}
                />
            </Spin>
        )
    }
}


CommonTableList['defaultProps'] = {
    isShowLoading: true,
    sourceId: getUUID(),
    type: 'get',
    isSaveAllPage: false,
    pagination: INIT_PAGINATION

}

export default CommonTableList;
