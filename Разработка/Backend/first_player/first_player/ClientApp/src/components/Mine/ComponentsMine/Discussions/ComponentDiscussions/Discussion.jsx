//импортируем необходимые файлы
import React from 'react';
import Like from '../../../../img/like';
import Dislike from '../../../../img/dislike';
import Eye from '../../../../img/eye';
import Comment from '../../../../img/comment';
import Share from '../../../../img/Share';
import Save from '../../../../img/Save';
import { Link } from 'react-router-dom';
import '../CSSDiscussions/Discussions.css';

class Discussion extends React.Component {
    
    render() {
        return (
            <div className='BoxDiscussion'>
                <div className='BoxDiscussionTop'>
                    <div className='BoxDiscussionTopBoxImg'>
                        <Link className='BoxDiscussionTopBoxImgA' to="/OtherUser">
                            <img className='BoxDiscussionTopImg' src= "" />
                        </Link>
                    </div>
                    <div className='BoxDiscussionTopTxt'>
                        <Link to="/OtherUser" className='BoxDiscussionTopTxtLink'>
                        <div className='BoxDiscussionTopTxtNicneim'>
                        Никнейм
                        </div>
                        <div className='BoxDiscussionTopTxtDate'>
                           12.11.1998
                        </div>
                        </Link>
                    </div>
                </div>
                <div className='BoxDiscussionCentr'>
                    <div className='BoxDiscussionCentrTema'>
                        Тема
                    </div>
                    
                    <div className='BoxDiscussionCentrTegs'>
                         теги
                    </div>
                </div>
                <hr className='ThemesHr' />
                <div className='BoxDiscussionbootom'>
                    <div className='BoxDiscussionbootomLeft'>
                        <button className='BoxDiscussionbootomLeftButton'>
                            <Like />
                        </button>
                        <div className='BoxDiscussionbootomLeftText'>
                        1
                        </div>
                        <button className='BoxDiscussionbootomLeftButton'>
                            <Dislike />
                        </button>
                    </div>
                    <div className='BoxDiscussionbootomCentr'>
                        <button className='BoxDiscussionbootomCentrButton'>
                            <Eye/>
                        </button>
                        <div className='BoxDiscussionbootomCentrText'>
                        25
                        </div>
                        <div className='BoxDiscussionbootomCentrText'>
                        <Link to= "/CommentsDscussion" className='BoxDiscussionbootomCentrButton'>
                           <Comment/>
                        </Link>
                        </div>
                        <div className='BoxDiscussionbootomCentrText'>
                        6
                        </div>
                    </div>
                    <div className='BoxDiscussionbootomRight'>
                        <button className='BoxDiscussionbootomRightButton'>
                            <Share/>
                        </button>
                        <button className='BoxDiscussionbootomRightButton'>
                            <Save/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Discussion