//импортируем необходимые файлы
import React from 'react';
import HeaderBoxContent from './ComponentsHeader/header-box-content';
//Класс хёдер
class Header extends React.Component {
    render(){
      return(
        <header className='Header'>
          <HeaderBoxContent />
        </header>
      )
    }
  }

  export default Header