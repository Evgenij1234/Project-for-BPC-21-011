//импортируем необходимые файлы
import React from 'react';
import SiteRulesText from './SiteRulesText';
import './SiteRules.css';

class SiteRules extends React.Component{
    render(){
        return(
           <div className='SiteRules'>
           <SiteRulesText/>
           </div>
        )
    }
}
export default SiteRules