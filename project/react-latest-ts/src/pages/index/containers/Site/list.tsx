import React, { Component } from 'react'
import ListItem from '../../components/ListItem/index'

//长页面滚动 位置记录
let scrollSite = 0;

/**
 * 定义组件props
 */
interface IProps {
    listData: object[]
}

interface IListItem {
    id: string,
    title: string
}
class List extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }
    componentDidMount () {

        //回到之前浏览的位置
        window.scrollTo(0, scrollSite);

    }

    componentWillUnmount () {

        //长页面滚动 位置记录
        scrollSite = window.scrollY;

    }

    render () {

        const { listData } = this.props;

        return (

            <div>

                {

                    listData.map((item: IListItem) => {

                        return <ListItem key={item.id} title={item.title} id={item.id}/>

                    })

                }

            </div>

        )

    }

}

export default List;
