import * as React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'

interface IProps {
	title: string,
	id: string
}

const ListItem = ({title, id}: IProps) => {

	return (

		<Link className='list-item' to={`/site/${id}?ts=123`}>{title}</Link>

	)

};

export default ListItem;
