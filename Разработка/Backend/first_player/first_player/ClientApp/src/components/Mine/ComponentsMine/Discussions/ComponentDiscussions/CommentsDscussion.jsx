//импортируем необходимые файлы
import React from 'react';
import '../CSSDiscussions/Discussions.css';
import CommentDis from './CommentDis';
import ThisDiscussion from './ThisDiscussion';

class CommentsDscussion extends React.Component {
    
    render() {
        return (
            <div className='CommentsDscussion'>
                <ThisDiscussion />
                <div className='Formcommentadd'>
                    <form className='Formcommentaddform' action="">
                        <textarea contenteditable className='Formcommentaddinput' placeholder='Ваш комментарий...' type="text" />
                        <input className='Formcommentaddinputsubmit' type="submit" name="" id="" />
                    </form>
                </div>
                <div className='CommentsPostsCommentBox'>
                <CommentDis />
                <CommentDis />
                </div>
            </div>
        )
    }
}
export default CommentsDscussion