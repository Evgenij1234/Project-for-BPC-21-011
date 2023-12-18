import React from 'react';
import Themes from './ComponentsSidebar/Themes';
class BoxAside extends React.Component {
    render(){
        return(
            <div className='BoxAside'>
                <div className='TopTopics'>
                    Топ Постов:
                </div>
                <Themes />
            </div>
        )
    }
}
export default BoxAside;