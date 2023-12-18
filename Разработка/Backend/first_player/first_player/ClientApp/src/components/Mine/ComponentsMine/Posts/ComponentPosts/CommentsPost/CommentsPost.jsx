import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './CommentsPost.css';
import Comment from './Comment';
import ThisPost from './ThisPost';
import axios from 'axios';


function CommentsPost() {
    const { postId } = useParams();
    const [commentText, setCommentText] = useState('');
    const [items, setItems] = useState([]);

    const handleCommentChange = (event) => {
        setCommentText(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const comment = {
            userId: localStorage.usersId,
            commentText: commentText,
            datepublication: new Date()

        } // ID пользователя из localStorage
        axios.post(`https://localhost:7221/AddComment/${postId}`, comment, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }

        })
            .then((response) => {
                window.location.href = `/CommentsPost/${postId}`;
                // Обработка успешной отправки комментария, например, обновление списка комментариев
            })
            .catch((error) => {
                console.error('Error:', error);
                window.location.href = `/RegistrationOrLoginBox`;
            });
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7221/AddComment/${postId}`);
                console.log(response);
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [postId]); // Пустой массив зависимостей означает, что эффект будет выполняться только один раз после монтирования




    return (
        <div className='CommentsPosts'>
            <ThisPost value={postId} />
            <div className='Formcommentadd'>
                <form className='Formcommentaddform' onSubmit={handleSubmit}>
                    <textarea
                        contentEditable
                        className='Formcommentaddinput'
                        placeholder='Ваш комментарий...'
                        type="text"
                        value={commentText}
                        onChange={handleCommentChange}
                    />
                    <input className='Formcommentaddinputsubmit' type="submit" value="Отправить" />
                </form>
            </div>
            <div className='CommentsPostsCommentBox'>
                
                {items.map((comment, index) => (
                    <Comment
                        key={index}
                        // передача данных комментария в Comment компонент
                        comment={comment}
                    />
                ))}
            </div>
        </div>
    );
}

export default CommentsPost;