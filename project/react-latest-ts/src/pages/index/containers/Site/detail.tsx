import React from 'react'
import { getRequestParams } from 'tools/utils'

interface IMatch {
    params: IParams
}

interface IParams {
    id: string
}

interface ILocation {
    search: string
}

const Detail = ({match, location}: {match: IMatch, location: ILocation}) => {


    const query = getRequestParams(location.search);

    return (

        <div style={{height: '2000px'}}>{`hi my id is ${match.params.id}, ts is ${query.ts}`}</div>

    )

}

export default Detail
