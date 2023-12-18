import React from 'react';
import axios from 'axios';
import './CSS/RegistrationOrLoginBox.css';

class Registration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nickname: '',
            email: '',
            passwords: '',
            createtime: '', 
            error: ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            nickname: this.state.nickname,
            email: this.state.email,
            passwords: this.state.passwords,
            createtime: new Date()
        };
        axios.post('https://localhost:7221/Registration', user)
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
                    this.setState({ error: error.response.data, email: "", passwords: "", nickname: "" })
                } else if (error.request) {
                    console.log("network error");
                    this.setState({ error: "Пробелмы сети" })
                } else {
                    console.log(error);
                    this.setState({ error: "Неизвестная ошибка" })
                }
            });


    }
    render() {
        return (
            <div className="Registration">
                <form className="Registrationform" onSubmit={this.handleSubmit} method="post">
                    <input className="Registrationinput" value={this.state.nickname} onChange={(e) => this.setState({ nickname: e.target.value })} placeholder='Никнейм...' type="text" />
                    <input className="Registrationinput" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} placeholder='Емайл...' type="text" />
                    <input className="Registrationinput" value={this.state.passwords} onChange={(e) => this.setState({ passwords: e.target.value })} placeholder='Пароль...' type="text" />
                    <input className="Registrationinputsubmit" type="submit" />
                    <label htmlFor="">{this.state.error}</label>
                </form>
            </div>
        )
    }
}
export default Registration