import React from 'react';
import './PostOrDiscussion.css';
import { Link } from 'react-router-dom';

class PostOrDiscussion extends React.Component {
    render() {
        return (
            <div id='creat1' className='PostOrDiscussion'>
                <button className='PostOrDiscussionButton'>
                    <Link className='PostOrDiscussionButtonLink' to="/AddPosts" >
                        Создать пост
                    </Link>
                </button>
            </div>
        )
    }
}
export default PostOrDiscussion;