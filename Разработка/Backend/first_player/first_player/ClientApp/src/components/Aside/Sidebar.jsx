//импортируем необходимые файлы
import React from 'react';
import BoxAside from './ComponentsAside/BoxAside';
import CreateTopic from './ComponentsAside/ComponentsSidebar/CreateTopic';
//Класс сайдбар
class Sidebar extends React.Component {
    render(){
      return(
        <aside className='Aside'>
          <BoxAside />
          <CreateTopic/>
        </aside>
      )
    }
  }

  export default Sidebar