//импортируем необходимые файлы
import React from 'react';
import './SiteRules.css';
import axios from 'axios';

const src = "https://localhost:7221/AutorsProdject";

class SiteRules extends React.Component{
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
           <div className='SiteRulesText'>
            <p className='SiteRulesTextP'>
            Правила сайта:
            </p>
                <div>
                Делайте хорошее, плохое не делайте!
                </div>
           </div>
        )
    }
}
export default SiteRules