import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'

const ListItem = ({title, id}) => {

	return (

		<Link className="list-item" to={`/site/${id}`}>{title}</Link>

	)

};

export default ListItem;
