import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { ListItemProps } from './interface';



const ListItem: React.SFC<ListItemProps> = ({title, id}) => {

	return (

		<Link className='list-item' to={`/site/${id}?ts=123`}>{title}</Link>

	)

};

export default ListItem;
