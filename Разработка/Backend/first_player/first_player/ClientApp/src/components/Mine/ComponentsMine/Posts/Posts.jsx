//импортируем необходимые файлы
import React from 'react';
import './PostsCCS/posts.css';
import axios from 'axios';
import Post from './ComponentPosts/Post';
const src = "https://localhost:7221/Posts";

class Posts extends React.Component {
  constructor(props) {
    super(props)
    axios.get(src)
    .then(res => {
      this.setState({items: res.data});
    })
    this.state = {
      items: []
    }
    
  }
  render() {
    return (
      <div className='BoxPosts'>
        {this.state.items.map(el =>(
          <Post post = {el.posts} autor = {el.postAutors} autorsImg = {el.autorsImg} autorsId = {el.autorsId}/>
        ))}
      </div>
    )
  }
}
export default Posts