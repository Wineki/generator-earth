import React from 'react'
import { getRequestParams } from 'tools/utils'
import { RouteComponentProps } from 'react-router'
import { IDetail } from './interface'



const Detail: React.SFC<IDetail> = ({match, location}) => {


    const query = getRequestParams(location.search);

    return (

        <div style={{height: '2000px'}}>{`hi my id is ${match.params.id}, ts is ${query.ts}`}</div>

    )

}

export default Detail
