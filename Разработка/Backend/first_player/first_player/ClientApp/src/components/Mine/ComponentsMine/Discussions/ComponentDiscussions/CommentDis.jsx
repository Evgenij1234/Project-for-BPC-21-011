import React from 'react';
import '../CSSDiscussions/Discussions.css';

class CommentDis extends React.Component {

    render() {
        return (
            <div className='CommentsDscussion'>
                <div className='CommentsDscussionboxtop'>
                    <div className='CommentsDscussionboxtopboximg'>
                        <img className='CommentsDscussionboxtopimg' src="" alt="" />
                    </div>
                    <div className='CommentsDscussionboxtopnic'>Никнейм</div>
                    <div></div>
                    <div className='CommentsDscussionboxtopdat'>11.11.2023</div>
                </div>
                <div className='CommentsDscussionboxbatom'>
                    Текст коммента
                    <hr className='hr' />
                </div>
            </div>
        )
    }
}
export default CommentDis