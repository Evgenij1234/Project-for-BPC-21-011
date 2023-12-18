//импортируем необходимые файлы
import React from 'react';
import './CSSDiscussions/Discussions.css';

class FilterDiscussions extends React.Component {

    render() {
        return (
            <div className='FilterDiscussions'>
                <button className='FilterDiscussionsButton'>
                <div className='FilterDiscussionsTxt'>
                    Все Темы
                </div>
                <div className='FilterDiscussionsImg'>
                    <svg width="15" height="15" viewBox="0 0 15">
                        <image width="15" height="15" href="data:image/png;base64,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" />
                    </svg>
                </div>
                </button>
            </div>
        )
    }
}
export default FilterDiscussions