import React from 'react';
import './CommentsPost.css';

class Comment extends React.Component {
    render() {
        //парсим дату
        const dateTime = this.props.comment.comment.datePublication;
        const date = dateTime.split('T')[0];

        //фото автора
        const imageDataAutor = this.props.comment.commentAuthor.imagePath;

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
        
        //console.log(this.props.comment.comment);
        return (
            <div className='CommentsPost'>
                <div className='CommentsPostboxtop'>
                    <div className='CommentsPostboxtopboximg'>
                        <img className='CommentsPostboxtopimg' src={imageUrlAutor} alt="" />
                        
                    </div>
                    <div className='CommentsPostboxtopnic'>{this.props.comment.commentAuthor.nickname}</div>
                    <div></div>
                    <div className='CommentsPostboxtopdat'>{date}</div>
                </div>
                <div className='CommentsPostboxbatom'>
                    {this.props.comment.comment.text}
                    <hr className='hr' />
                </div>
            </div>
        )
    }
}
export default Comment