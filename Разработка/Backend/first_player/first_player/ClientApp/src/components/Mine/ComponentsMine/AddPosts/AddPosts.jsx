//импортируем необходимые файлы
import React from 'react';
import './AddPosts.css';
import Camera from '../../../img/Camera';
import axios from 'axios'; // импортируем Axios
import { error } from 'jquery';

class AddPosts extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            error: ""
        }
    }
    componentDidMount() {
        // При загрузке компонента устанавливаем текущую дату в скрытое поле
        const currentDate = new Date().toISOString().split('T')[0]; // Получаем текущую дату
        document.getElementById('currentDate').value = currentDate; // Устанавливаем значение в скрытое поле
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const topic = form.elements['topic'].value;
        const posttext = form.elements['posttext'].value;
        const postteg = form.elements['postteg'].value;
        // Проверяем, заполнены ли поля темы поста, текста и тега
    if (!topic || !posttext || !postteg) {
        // Если не все поля заполнены, вы можете вывести сообщение об ошибке или выполнить другие действия
        console.error('Заполните все поля: тема поста, текст поста, теги');
        this.setState({ error: "Заполните все поля: тема поста, текст поста, теги" })
        return; // Прекращаем выполнение функции handleSubmit
    }


        const formData = new FormData(form);

        try {
            const response = await axios.post('https://localhost:7221/Posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            }
            );
            console.log('Успешно отправлено!', response);
            window.location.href = "/";

        } catch (error) {
            console.error('Ошибка при отправке:', error);
        }
    };

    render() {
        return (
            <div className='AddPostsBox'>
                <div className='AddPosts'>
                    <form className='AddPostsform' onSubmit={this.handleSubmit}>
                        <input className='AddPostsformtem' placeholder='Тема поста' id="" type="text" name="topic" />
                        <textarea className='AddPostsformtext' placeholder='Текст поста' id="" type="text" name="posttext" />
                        <input className='AddPostsformteg' placeholder='Теги' id="" type="text" name="postteg" />
                        <label className='AddPostsformimg' htmlFor="imgpost">
                            <Camera />
                        </label>
                        
                        <input className='AddPostsformimgin' placeholder='Картинка' id="imgpost" type="file" name="imgpost" />
                        <input type="hidden" name="usersId" defaultValue={localStorage.usersId} />
                        <input type="hidden" id="currentDate" name="datepublication" />
                        <input className='AddPostsformsumbit' type="submit" value="Опубликовать" />
                    <div>{this.state.error}</div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddPosts