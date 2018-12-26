import React from 'react'
import qs from 'qs'

const Detail = ({match, location}) => {


    const query = qs.parse(location.search, { ignoreQueryPrefix: true });

    return (

        <div style={{height: '2000px'}}>{`hi my id is ${match.params.id}, ts is ${query.ts}`}</div>

    )

}

export default Detail
