//импортируем необходимые файлы
import React from 'react';
import '../PostsCCS/posts.css';
import Like from '../../../../img/like';
import Dislike from '../../../../img/dislike';
import Eye from '../../../../img/eye';
import Comment from '../../../../img/comment';
import Share from '../../../../img/Share';
import Save from '../../../../img/Save';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import axios from 'axios';
class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            postRating: this.props.post.postrating, // Предполагается, что значение лайков приходит через props
            cheks1: 0,
            cheks2: 0,
            chek1: 0,
            chek2: 0,
        };
    }

    handleLike = async () => {
        if (localStorage.accessToken !== undefined) {
            if (this.state.chek1 === 0) {
                const postId = this.props.post.id; // ID поста, который вы хотите лайкнуть
                const increment = 1; // Лайк увеличивает рейтинг на 1
                try {
                    if (this.state.cheks1 === 0) {
                        const response = await axios.put(`https://localhost:7221/Posts?postId=${postId}&increment=${increment}`);
                        if (response.status === 200) {
                            this.setState(prevState => ({
                                postRating: prevState.postRating + increment
                            }));

                        } else {
                            // Обработка других статусов ответа, если необходимо
                        }
                        this.state.cheks1 = 1
                        this.state.chek2 = 1
                    }
                    else {
                        const increment = -1;
                        const response = await axios.put(`https://localhost:7221/Posts?postId=${postId}&increment=${increment}`);
                        if (response.status === 200) {
                            this.setState(prevState => ({
                                postRating: prevState.postRating + increment
                            }));
                        } else {
                            // Обработка других статусов ответа, если необходимо
                        }
                        this.state.cheks1 = 0
                        this.state.chek2 = 0
                    }

                } catch (error) {
                    // Обработка ошибок запроса
                }
            }
        }
        else {
            window.location.href = "/RegistrationOrLoginBox";
        }
    };

    handleDislike = async () => {
        if (localStorage.accessToken !== undefined) {
            if (this.state.chek2 === 0 && localStorage.accessToken !== undefined) {
                const postId = this.props.post.id; // ID поста, который вы хотите дизлайкнуть
                const increment = -1; // Дизлайк уменьшает рейтинг на 1
                try {
                    if (this.state.cheks2 === 0) {
                        const response = await axios.put(`https://localhost:7221/Posts?postId=${postId}&increment=${increment}`);
                        if (response.status === 200) {
                            this.setState(prevState => ({
                                postRating: prevState.postRating + increment
                            }));
                        } else {
                            // Обработка других статусов ответа, если необходимо
                        }
                        this.state.cheks2 = 1;
                        this.state.chek1 = 1
                    }
                    else {
                        const increment = 1;
                        const response = await axios.put(`https://localhost:7221/Posts?postId=${postId}&increment=${increment}`);
                        if (response.status === 200) {
                            this.setState(prevState => ({
                                postRating: prevState.postRating + increment
                            }));
                        } else {
                            // Обработка других статусов ответа, если необходимо
                        }
                        this.state.cheks2 = 0;
                        this.state.chek1 = 0
                    }
                } catch (error) {
                    // Обработка ошибок запроса
                }
            }
        }
        else {
            window.location.href = "/RegistrationOrLoginBox";
        }
    };
    render() {

        //парсим дату
        const dateTime = this.props.post.datepublication;
        const date = dateTime.split('T')[0];

        //фото поста
        const { post } = this.props;
        const imageData = post.imgpost; // Байтовый массив изображения


        // Преобразование строки в байтовый массив (Uint8Array)
        const byteCharacters = atob(imageData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        // Создание Blob из байтового массива
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        // Создание URL из Blob
        const imageUrl = URL.createObjectURL(blob);

        //фото автора
        const imageDataAutor = this.props.autorsImg;

        const byteCharactersAutor = atob(imageDataAutor);
        const byteNumbersAutor = new Array(byteCharactersAutor.length);
        for (let i = 0; i < byteCharactersAutor.length; i++) {
            byteNumbersAutor[i] = byteCharactersAutor.charCodeAt(i);
        }
        const byteArrayAutor = new Uint8Array(byteNumbersAutor);
        // Создание Blob из байтового массива
        const blobAutor = new Blob([byteArrayAutor], { type: 'image/jpeg' });
        // Создание URL из Blob
        const imageUrlAutor = URL.createObjectURL(blobAutor);
        // Проверка наличия картинки
        function renderPostImage(imageUrl) {
            if (post.imgpost != undefined) {
                return (
                    <img className='BoxPostCentrImg' src={imageUrl} alt="Post Image" />
                );
            }
            return null; // Если imageUrl отсутствует, возвращаем null, чтобы не отображать блок
        }
        return (
            <div className='BoxPost'>
                <div className='BoxPostTop'>
                    <div className='BoxPostTopBoxImg'>
                        <Link className='BoxPostTopBoxImgA' to="#">
                            <img className='BoxPostTopImg' src={imageUrlAutor} />
                        </Link>
                    </div>
                    <div className='BoxPostTopTxt'>
                        <Link to="#" className='BoxPostTopTxtLink'>
                            <div className='BoxPostTopTxtNicneim'>
                                {this.props.autor}
                            </div>
                            <div className='BoxPostTopTxtDate'>
                                {date}
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='BoxPostCentr'>
                    <div className='BoxPostCentrTema'>
                        {this.props.post.topic}
                    </div>

                    <div className='BoxPostCentrBoxImg'>
                        {renderPostImage(imageUrl)}
                    </div>
                    <div className='BoxPostCentrText'>
                        {this.props.post.posttext}
                    </div>
                    <div className='BoxPostCentrTegs'>
                        {this.props.post.postteg}
                    </div>
                </div>
                <hr className='ThemesHr' />
                <div className='BoxPostbootom'>
                    <div className='BoxPostbootomLeft'>
                        <button className='BoxPostbootomLeftButton' onClick={this.handleLike}>
                            <Like />
                        </button>
                        <div className='BoxPostbootomLeftText'>
                            {this.state.postRating}
                        </div>
                        <button className='BoxPostbootomLeftButton' onClick={this.handleDislike}>
                            <Dislike />
                        </button>
                    </div>
                    <div className='BoxPostbootomCentr'>
                        <button className='BoxPostbootomCentrButton'>
                            <Eye />
                        </button>
                        <div className='BoxPostbootomCentrText'>
                            {this.props.post.postviews}
                        </div>
                        <div className='BoxPostbootomCentrText'>
                            {console.log(post.id)}
                            <Link to={`/CommentsPost/${post.id}`} className='BoxPostbootomCentrButton'>
                                <Comment />
                            </Link>
                        </div>
                        <div className='BoxPostbootomCentrText'>
                            {this.props.post.postcomments}
                        </div>
                    </div>
                    <div className='BoxPostbootomRight'>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post