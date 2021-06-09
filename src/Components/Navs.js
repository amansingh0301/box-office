import React from 'react'
import {Link} from 'react-router-dom';

const LINKS = [
    {
        to:'/',
        text:'Home'
    },
    {
        to:'/starred',
        text:'Starred'
    }
]

const Navs = () => {
    return (
        <ul>
            {
                LINKS.map(item => <li><Link to={item.to}>{item.text}</Link></li>)
            }
        </ul>
    )
}

export default Navs;
