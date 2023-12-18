//импортируем необходимые файлы
import React from 'react';
import Like from '../../../../../img/like';
import Dislike from '../../../../../img/dislike';
import Eye from '../../../../../img/eye';
import Share from '../../../../../img/Share';
import Save from '../../../../../img/Save';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ThisPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            postRating: 0, // Предполагается, что значение лайков приходит через props
            cheks1: 0,
            cheks2: 0,
            chek1: 0,
            chek2: 0,
        };
    }

    componentDidMount() {
        axios.get(`https://localhost:7221/Posts/${this.props.value}`)
            .then(res => {
                this.setState({ items: res.data });
                this.setState({ postRating: res.data.posts.postrating });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }






    handleLike = async () => {
        if (localStorage.accessToken !== undefined) {
            if (this.state.chek1 === 0) {
                const postId = this.props.value; // ID поста, который вы хотите лайкнуть
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
            if (this.state.chek2 === 0) {
                const postId = this.props.value; // ID поста, который вы хотите лайкнуть
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
        const { items } = this.state;
        console.log(this.state.items);
        // Проверяем, есть ли данные, прежде чем обращаться к ним
        if (!items) {
            return <div>Loading...</div>;
        }
        const post = items.posts;
        // Парсим дату
        const dateTime = post.datepublication;
        const date = dateTime.split('T')[0];

        // Фото поста
        const imageData = post.imgpost;
        const byteCharacters = atob(imageData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);

        // Фото автора
        const imageDataAutor = items.autorsImg;
        const byteCharactersAutor = atob(imageDataAutor);
        const byteNumbersAutor = new Array(byteCharactersAutor.length);
        for (let i = 0; i < byteCharactersAutor.length; i++) {
            byteNumbersAutor[i] = byteCharactersAutor.charCodeAt(i);
        }
        const byteArrayAutor = new Uint8Array(byteNumbersAutor);
        const blobAutor = new Blob([byteArrayAutor], { type: 'image/jpeg' });
        const imageUrlAutor = URL.createObjectURL(blobAutor);

        // Функция для отображения изображения поста
        function renderPostImage(imageUrl) {
            if (post.imgpost != undefined) {
                return (
                    <img className='BoxPostCentrImg' src={imageUrl} alt="Post Image" />
                );
            }
            return null;
        }
        return (

            <div className='BoxPost'>
                <div className='BoxPostTop'>
                    <div className='BoxPostTopBoxImg'>
                        <Link className='BoxPostTopBoxImgA' to="/OtherUser">
                            <img className='BoxPostTopImg' src={imageUrlAutor} alt="User" />
                        </Link>
                    </div>
                    <div className='BoxPostTopTxt'>
                        <Link to="/OtherUser" className='BoxPostTopTxtLink'>
                            <div className='BoxPostTopTxtNicneim'>
                                {items.postAutors}
                            </div>
                            <div className='BoxPostTopTxtDate'>
                                {date}
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='BoxPostCentr'>
                    <div className='BoxPostCentrTema'>
                        {post.topic}
                    </div>
                    <div className='BoxPostCentrBoxImg'>
                        {renderPostImage(imageUrl)}
                    </div>
                    <div className='BoxPostCentrText'>
                        {post.posttext}
                    </div>
                    <div className='BoxPostCentrTegs'>
                        {post.postteg}
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
                            {post.postviews}
                        </div>
                    </div>
                    <div className='BoxPostbootomRight'>

                    </div>
                </div>
            </div>
        );
    }
}
export default ThisPost