import React from 'react';
import Posts from '../../Posts/Posts';
class SavedPosts extends React.Component {
    render() {
        return (
            <div>
                <div className='SavedPoststop'>
                    Сохраненные посты
                </div>
                <div className='SavedPoststopPosts'>
                <Posts/>
                </div>
            </div>

        )
    }

}

export default SavedPosts