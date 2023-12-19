import React from 'react';
import axios from 'axios';
import './Admin.css';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            error: '',
            usersCount: 0,
            postsCount: 0,
            commentsCount: 0
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            nickname: this.state.nickname
        };

        axios.delete(`https://localhost:7221/Admin/${user.nickname}`)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ error: "Пользователь удален", nickname: '' });
                    window.location.href = "/Admin";
                }
            })
            .catch((error) => {
                if (error.response) {
                    this.setState({ error: error.response.data, nickname: '' });
                } else if (error.request) {
                    this.setState({ error: "Проблемы с сетью", nickname: '' });
                } else {
                    this.setState({ error: "Неизвестная ошибка", nickname: '' });
                }
            });
    };
    // Метод для получения статистики
    fetchStatistics = () => {
        axios.get('https://localhost:7221/Admin')
            .then((response) => {
                const { usersCount, postsCount, commentsCount } = response.data;
                this.setState({
                    usersCount,
                    postsCount,
                    commentsCount,
                    error: ''
                });
            })
            .catch((error) => {
                this.setState({
                    error: "Не удалось получить статистику"
                });
            });
    };
    componentDidMount() {
        // Получение статистики при загрузке компонента
        this.fetchStatistics();
    }
    render() {
        localStorage.clear();
        console.log(localStorage);
        return (
            <div className='Admin'>
                <div>Удалить пользователя</div>
                <form className='AdminDelete' onSubmit={this.handleSubmit}>
                    <input
                        placeholder='Никнейм...'
                        value={this.state.nickname}
                        onChange={(e) => this.setState({ nickname: e.target.value })}
                        type="text"
                    />
                    <input className='AdminDeleteButton' type="submit" value="Удалить" />
                </form>
                <br />
                {/* Отображение статистики */}
                <div className='AdminStatic'>
                    <div className='AdminStaticteme'>Статистика:</div>
                    <div>Всего пользователей: {this.state.usersCount}</div>
                    <div>Всего постов: {this.state.postsCount}</div>
                    <div>Всего комментариев: {this.state.commentsCount}</div>
                </div>
                <label>{this.state.error}</label>
            </div>
        );
    }
}

export default Admin;