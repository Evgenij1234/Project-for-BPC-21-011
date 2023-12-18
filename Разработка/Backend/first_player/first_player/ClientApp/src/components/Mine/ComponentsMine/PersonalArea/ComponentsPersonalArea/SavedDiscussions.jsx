import React from 'react';
import Discussions from '../../Discussions/Discussions';
class SavedDiscussions extends React.Component {
    render() {
        return (
            <div>
            <div className='SavedPoststop'>
                Сохраненные обсуждения
            </div>
            <div className='BoxDiscussions'>
                <Discussions/>
            </div>
        </div>
        )
    }
    
}

export default SavedDiscussions