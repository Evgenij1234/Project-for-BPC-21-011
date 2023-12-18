import React from 'react';
import PostOrDiscussion from './PostOrDiscussion';
class CreateTopic extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            click: "",
            namberclik: 0
        }
        this.clickebatton = this.clickebatton.bind(this)
    }
    render(){
        return(
            <div className='CreateTopic'>
                <button onClick={this.clickebatton} className='CreateTopicButton'>
                    Создать
                </button>
                {this.state.click}
            </div>
        )
    }
    clickebatton(){
        if(this.state.namberclik == 0){
            this.setState({click: <PostOrDiscussion/>})
            this.setState({namberclik: +1})
        }
        else{
            this.setState({click: ""})
            this.setState({namberclik: 0})
        }
        
    }
}
export default CreateTopic;