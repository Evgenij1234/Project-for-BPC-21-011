//импортируем необходимые файлы
import React from 'react';
import AutorsProdjectText from './AutorsProdjectText';
import './AutorProdjectCSS/AutorProdject.css';

class AutorsProdject extends React.Component{
    render(){
        return(
           <div className='AutorsProdject'>
           <AutorsProdjectText/>
           </div>
        )
    }
}
export default AutorsProdject