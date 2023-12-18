import React from 'react';
import Comment from '../../../img/comment';
import Eye from '../../../img/eye';
import { Link } from 'react-router-dom';

class Theme extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div className='Theme'>
                <div className='Theme-txt'>
                    <div className='Theme-txt-a'>
                    {this.props.post.topic}
                    </div>
                </div>
                <div className='ThemeBoxBottom'>
                    <div className='ThemeBoxBottomLeft'>
                        <Comment />
                        <div className='ThemeBoxBottomTxt'>
                        {this.props.post.postcomments}
                        </div>
                    </div>
                    <div className='ThemeBoxBottomRight'>
                        <Eye />
                        <div className='ThemeBoxBottomTxt'>
                        {this.props.post.postviews}
                        </div>
                    </div>
                </div>
                <hr className='ThemesHr'/>
            </div>
        )
    }
}
export default Theme;