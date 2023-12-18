import React from 'react';
import { Link } from 'react-router-dom';

class PersonalAccountMenu extends React.Component {
    render() {
        const imageData = localStorage.usersimagepath; // Байтовый массив изображения

        // Преобразование строки в байтовый массив (Uint8Array)
        const byteCharacters = atob(imageData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        // Создание Blob из байтового массива
        const blob = new Blob([byteArray], { type: 'image/jpeg' });

        // Создание URL из Blob
        const imageUrl = URL.createObjectURL(blob);
        //парсим дату
        const dateTime = localStorage.userscreatetime;

        const date = dateTime.split('T')[0];
        return (
            <div>
                <div className='PersonalAccountuser'>
                    <div className='PersonalAccountuserimgbox'>
                        <img className='PersonalAccountuserimg' src={imageUrl} alt="" />
                    </div>
                    <div className='PersonalAccountusernic'>
                        {localStorage.usersnickname}
                    </div>
                    <div>
                        {date}
                    </div>
                    <div>
                        <button className='PersonalAccountusernicexit' onClick={this.delite}>
                            Выход
                        </button>
                    </div>
                </div>
                <div className='PersonalAccountMenuBox'>
                    <Link className='PersonalAccountMenuBoxLink' to="EditPersonalData">Л. данные</Link>
                </div>
            </div>
        )
    }
    delite() {
        localStorage.clear();
        console.log(localStorage);
        window.location.href = "/";
    }
}


export default PersonalAccountMenu