import React from 'react';
import Theme from './Theme';
import axios from 'axios';
const src = "https://localhost:7221/Posts";
class Themes extends React.Component {
    constructor(props) {
        super(props)
        axios.get(src)
            .then(res => {
                this.setState({ items: res.data });
            })
        this.state = {
            items: []
        }

    }
    render() {
        return (
            <div className='Themes'>
                <hr className='ThemesHr' />
                {this.state.items.slice(0, 5).map(el => (
                    <Theme post={el.posts} autor={el.postAutors} autorsImg={el.autorsImg} autorsId={el.autorsId} />
                ))}
            </div>
        )
    }
}
export default Themes;