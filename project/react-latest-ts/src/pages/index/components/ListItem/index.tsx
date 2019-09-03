import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { TListItem } from './interface';



const ListItem: React.SFC<TListItem> = ({title, id}) => {

	return (

		<Link className='list-item' to={`/site/${id}?ts=123`}>{title}</Link>

	)

};

export default ListItem;
