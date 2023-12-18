import React from 'react';
import './CSS/RegistrationOrLoginBox.css';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      passwords: '',
      error: ''
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      passwords: this.state.passwords
    };
    if (user.email === "" || user.passwords === "") {
      console.log("Не указан логин или пароль");
      this.setState({ error: "Не указан логин или пароль" })
    }
    else if(user.email === "admin" || user.passwords === "admin"){
      axios.post('https://localhost:7221/loginAdmin', user)
      window.location.href = "/Admin";
    }
    else {
      axios.post('https://localhost:7221/login', user)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("accessToken", response.data.value.accessToken);
            localStorage.setItem("username", response.data.value.username);
            localStorage.setItem("usersId", response.data.value.usersId);
            localStorage.setItem("usersnickname", response.data.value.usersnickname);
            localStorage.setItem("usersimagepath", response.data.value.usersimagepath);
            localStorage.setItem("userscreatetime", response.data.value.userscreatetime);
            console.log(localStorage);
            window.location.href = "/PersonalArea/PersonalAccountMenu";
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
            this.setState({ error: "Пользователь не найден", email: "", passwords: "" })
          } else if (error.request) {
            console.log("network error");
            this.setState({ error: "Пробелмы сети" })
          } else {
            console.log(error);
            this.setState({ error: "Неизвестная ошибка" })
          }
        });
    }
  }
  render() {
    return (
      <div className="Registration">
        <form className='Registrationform' onSubmit={this.handleSubmit} method="get">
          <input className='Registrationinput' value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} placeholder='Емайл...' type="text" />
          <input className='Registrationinput' value={this.state.passwords} onChange={(e) => this.setState({ passwords: e.target.value })} placeholder='Пароль...' type="text" />
          <input className="Registrationinputsubmit" type="submit" />
          <label htmlFor="">{this.state.error}</label>
        </form>
      </div>
    )
  }

}
export default Login