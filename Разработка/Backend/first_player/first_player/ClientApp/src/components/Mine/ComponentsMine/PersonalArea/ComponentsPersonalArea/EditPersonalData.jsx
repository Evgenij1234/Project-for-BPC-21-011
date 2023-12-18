import React from 'react';
import Camera from '../../../../img/Camera';
import axios from 'axios';

class EditPersonalData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: ''
        }
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        try {
            const response = await axios.post('https://localhost:7221/Personaldata', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(formData);
            console.log('Успешно отправлено!');
            console.log(response.data)
            localStorage.setItem("accessToken", response.data.value.accessToken);
            localStorage.setItem("username", response.data.value.username);
            localStorage.setItem("usersId", response.data.value.usersId);
            localStorage.setItem("usersnickname", response.data.value.usersnickname);
            localStorage.setItem("usersimagepath", response.data.value.usersimagepath);
            localStorage.setItem("userscreatetime", response.data.value.userscreatetime);
            console.log(localStorage);
            window.location.href = "/PersonalArea/PersonalAccountMenu";
            
        } catch (error) {
            console.error('Ошибка при отправке:', error.response.data);
            this.setState({ error: error.response.data })
        }
    };

    render() {
        return (
            <div>
                <div className='SavedPoststop'>
                    Редактировать личные данные
                </div>
                
                <div className='EditPersonalDataBox'>
                    <form className='EditPersonalDataBoxform' onSubmit={this.handleSubmit}>
                    <div htmlFor="">{this.state.error}</div>
                        <label className='ditPersonalDataBoxformimg' htmlFor="imagepath"><Camera /></label>
                        <input className='ditPersonalDataBoxformimginput' type="file" id="imagepath" name="imagepath"></input>
                        <label className='EditPersonalDataBoxlabel' htmlFor="nickname">Никнейм</label>
                        <input className='EditPersonalDataBoxinput' type="text" id="nickname" name="nickname" placeholder='Никнейм...' />
                        <label className='EditPersonalDataBoxlabel' htmlFor="email">Емайл</label>
                        <input className='EditPersonalDataBoxinput' type="text" id="email" name="email" placeholder='Емайл...' />
                        <label className='EditPersonalDataBoxlabel' htmlFor="passwords">Пароль</label>
                        <input className='EditPersonalDataBoxinput' type="text" id="passwords" name="passwords" placeholder='Пароль...' />
                        <input type="hidden" name="userId" defaultValue={localStorage.usersId}/> {/* Скрытое поле с Id из localStorage */}
                        <input className='EditPersonalDataBoxinputend' type="submit" value='Сохранить' />
                    </form>
                </div>
            </div>
        );
    }
}

export default EditPersonalData;