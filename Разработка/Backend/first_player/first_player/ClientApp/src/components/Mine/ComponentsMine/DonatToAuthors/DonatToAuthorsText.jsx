//импортируем необходимые файлы
import React from 'react';
import './DonatToAuthors.css';
import axios from 'axios';

const src = "https://localhost:7221/AutorsProdject";

class DonatToAuthorsText extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get(src)
      .then(res => {
        const box = res.data;
        this.setState({ box });
      })    
    }
    render(){
        return(
           <div className='DonatToAuthorsText'>
            <p className='DonatToAuthorsTextP'>
            Донат авторам:
            </p>
            Пока затычка
           </div>
        )
    }
}
export default DonatToAuthorsText