//импортируем необходимые файлы
import React from 'react';
import { Link } from 'react-router-dom';
import './Mobile.css';
import Mobile from './Mobile';

class Futher extends React.Component{
    render(){
        return(
            <div className='footer' >
                <div className='FooterBox'>
                   <Link to="/SiteRules" className='FooterBoxA' >
                   Правила сайта
                   </Link>
                   <Link to="/AutorsProdject" className='FooterBoxA'>
                   Авторы
                   </Link>
                   <button onclick={Mobile.download} className='FooterBoxbuttonMobile'>
                   Мобайл
                   </button>
                </div>
            </div>
        )
    }
}

export default Futher