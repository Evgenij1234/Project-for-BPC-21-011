//импортируем необходимые файлы
import React from 'react';
import Logo from './ComponentsHeaderLogo/Logo';
import ContentBox2 from './ComponentHeaderPostsandDiscussions/content-box2';
import ContentBox3 from './ComponentsSwarchandSettings/content-boxe';
//Класс хёдер
class HeaderBoxContent extends React.Component {
    render(){
      return(
        <div className='header-box-content'>
            <Logo />
            <ContentBox2 />
            <ContentBox3 />
        </div>
      )
    }
  }

  export default HeaderBoxContent