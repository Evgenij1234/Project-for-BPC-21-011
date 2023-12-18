//импортируем необходимые файлы
import React from 'react';
import './CSSDiscussions/Discussions.css';
import FilterDiscussions from './FilterDiscussions';
import Discussion from './ComponentDiscussions/Discussion';

/*const src = "https://localhost:7221/Discussions";*/
class Discussions extends React.Component{
    
    render(){
        return(
            <div className='BoxDiscussions'>
            <FilterDiscussions />
              <Discussion />
          </div>
        )
    }
}
export default Discussions