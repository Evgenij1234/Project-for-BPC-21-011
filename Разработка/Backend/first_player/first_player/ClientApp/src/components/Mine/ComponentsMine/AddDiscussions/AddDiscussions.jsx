//импортируем необходимые файлы
import React from 'react';
import './AddDiscussions.css';

class AddDiscussions extends React.Component{
    render(){
        return(
            <div className='AddDiscussionsBox'>
                <div className='AddDiscussions'>
                    <form className='AddDiscussionsform' action="/" method="post">
                        <input className='AddDiscussionsformtem' placeholder='Тема обсуждения' id="" type="text" name="theme" />
                        <textarea className='AddDiscussionsformtext' placeholder='Текст Обсуждения' id="" type="text" name="text" />
                        <input className='AddDiscussionsformteg' placeholder='Теги' id="" type="text" name="tegs" />
                        <input className='AddDiscussionsformsumbit' type="submit" value="Опубликовать" />
                    </form>
                </div>
            </div>
        )
    }
}
export default AddDiscussions