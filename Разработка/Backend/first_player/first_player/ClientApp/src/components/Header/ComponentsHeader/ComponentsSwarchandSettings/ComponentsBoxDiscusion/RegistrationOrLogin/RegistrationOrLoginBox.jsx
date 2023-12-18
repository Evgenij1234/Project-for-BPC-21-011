//импортируем необходимые файлы
import React from 'react';
import './CSS/RegistrationOrLoginBox.css';
import Registration from './Registration';
import Login from './Login';

class RegistrationOrLoginBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      click: "",
      namberclik: 0,
      clickEntrance: "",
      namberclikEntrance: 0
    }
    this.vievRegistration = this.vievRegistration.bind(this)
    this.vievEntrance = this.vievEntrance.bind(this)
  }
  render() {
    return (
      <div className="RegistrationOrLoginBox">
        <div className='box'>
        <button onClick={this.vievRegistration} className='RegistrationOrLoginBoxReg'>
          Регистрация
        </button>
        <button onClick={this.vievEntrance} className='RegistrationOrLoginBoxEntrance'>
          Вход
        </button>
        </div>
        {this.state.click}
        {this.state.clickEntrance}
      </div>
    )
  }
  /*Переключатель регистрации и входа*/
  vievRegistration() {
    if (this.state.namberclik == 0) {
      this.setState({ click: <Registration /> })
      this.setState({ namberclik: +1 })
      this.setState({namberclikEntrance: 0})
      this.setState({ clickEntrance: "" })
    }
    else {
      this.setState({ click: "" })
      this.setState({ namberclik: 0 })
    }
  }
  vievEntrance() {
    if (this.state.namberclikEntrance == 0) {
      this.setState({ clickEntrance: <Login /> })
      this.setState({ namberclikEntrance: +1 })
      this.setState({ click: "" })
      this.setState({ namberclik: 0 })
    }
    else {
      this.setState({ clickEntrance: "" })
      this.setState({ namberclikEntrance: 0 })
    }
  }
}
export default RegistrationOrLoginBox