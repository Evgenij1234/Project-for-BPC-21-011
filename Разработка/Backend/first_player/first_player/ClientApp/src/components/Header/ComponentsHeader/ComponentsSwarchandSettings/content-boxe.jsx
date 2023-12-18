//импортируем необходимые файлы
import React from 'react';
import ContentBoxSearch from './ComponentsBoxSearch/content-box-search';
import ContentBoxRectangle from './ComponentsBoxDiscusion/content-box-rectangle';
//Класс хёдер
class ContentBox3 extends React.Component {
    render(){
      return(
        <div className='content-box3'>
            <ContentBoxSearch />
            <ContentBoxRectangle />  
        </div>
      )
    }
  }

  export default ContentBox3