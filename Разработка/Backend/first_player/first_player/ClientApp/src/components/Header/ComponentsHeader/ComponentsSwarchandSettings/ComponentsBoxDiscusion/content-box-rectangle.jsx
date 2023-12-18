//импортируем необходимые файлы
import React from 'react';
import ContentBoxRectangleButton from './content-box-rectangle-button';
//Класс хёдер
class ContentBoxRectangle extends React.Component {
    render(){
      return(
        <div className='content-box-rectangle'>
            <ContentBoxRectangleButton />
        </div>
      )
    }
  }

  export default ContentBoxRectangle