import React from 'react'
import HomeLogo from '../../components/HomeLogo'

const Home = ({initialData}) => {

    return (

        <div>

            <HomeLogo />
            {`hello world im HomePage`}

            <br/>

            {`server initialData${JSON.stringify(initialData)}`}

        </div>

    )

};

export default Home;
