import React from 'react'
import qs from 'qs'
import Wrapper from 'react-ssr-with-koa/WrapperForContainer'

const Detail = ({match, location, initialData}) => {


    const query = qs.parse(location.search, { ignoreQueryPrefix: true });

    return (

        <div style={{height: '2000px'}}>
            <p>{`hi my id is ${match.params.id}, ts is ${query.ts}`}</p>
            <hr/>
            <p>server initialData: {initialData}</p>
        </div>

    )

};

// #if process.env.IS_SERVER === true
Detail.getInitialProps = () => {
    return 'detail data'
};
// #endif

export default Wrapper({name: 'index_siteDetail', type: 'route'})(Detail)
