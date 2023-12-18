//импортируем необходимые файлы
import React from 'react';
import { Link } from 'react-router-dom';
//Класс хёдер
class ContentBoxPosts extends React.Component {
    render() {
        return (
            <div className='content-box-posts'>
                <button className="content-box-posts-button">
                    <Link className='HeaderLink' to="/">
                    Посты
                    </Link>
                </button>
            </div>
        )
    }
}

export default ContentBoxPosts 