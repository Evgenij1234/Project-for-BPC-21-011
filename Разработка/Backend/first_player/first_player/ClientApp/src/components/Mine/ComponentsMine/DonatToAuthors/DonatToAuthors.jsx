//импортируем необходимые файлы
import React from 'react';
import DonatToAuthorsText from './DonatToAuthorsText';
import './DonatToAuthors.css';

class DonatToAuthors extends React.Component{
    render(){
        return(
           <div className='SiteRules'>
           <DonatToAuthorsText/>
           </div>
        )
    }
}
export default DonatToAuthors