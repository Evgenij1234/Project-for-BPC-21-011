//импортируем необходимые файлы
import React from 'react';
import ContentBoxPosts from './content-box-posts';
import ContentBoxDiscussions from './content-box-discussions';
//Класс хёдер
class ContentBox2 extends React.Component {
    render(){
      return(
        <div className='content-box2'>
            <ContentBoxPosts  />
            <ContentBoxDiscussions />
        </div>
      )
    }
  }

  export default ContentBox2 