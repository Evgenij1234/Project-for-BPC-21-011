//импортируем необходимые файлы
import React from 'react';
import './AutorProdjectCSS/AutorProdject.css';
import axios from 'axios';

    const src = "https://localhost:7221/AutorsProdject";
    
class AutorsProdjectText extends React.Component {
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
    render() {
        return (
            <div className='AutorsProdjectText'>
                <p className='AutorsProdjectTextP' >
                    О авторах
                </p>
                <div>
                <div>Мы делали делали делали и что-то да сделали.</div>
                <br />
                <div>В разработке учавствовали:</div>
                <div>1. Мацук Владислва </div>
                <div>2. Семенов Евгений </div> 
                <div>3. Ковальчук Кирилл  </div> 
                <div>4. Цветков Лев  </div> 
                <div>5. Еремеев Дмитрий </div>
                <div>6. Костюк Стас </div>
                <div>7. Шауфлер Сергей </div>
                <div>8. Загуменный Кирилл </div>
                </div>
            </div>
        )
    }
}
export default AutorsProdjectText