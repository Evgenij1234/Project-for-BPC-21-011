//импортируем необходимые файлы
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Posts from './ComponentsMine/Posts/Posts';
import Discussions from './ComponentsMine/Discussions/Discussions';
import AutorsProdject from './ComponentsMine/AutorsProdject/AutorsProdject';
import SiteRules from './ComponentsMine/SiteRules/SiteRules';
import DonatToAuthors from './ComponentsMine/DonatToAuthors/DonatToAuthors';
import AddPosts from './ComponentsMine/AddPosts/AddPosts';
import AddDiscussions from './ComponentsMine/AddDiscussions/AddDiscussions';
import CommentsPost from './ComponentsMine/Posts/ComponentPosts/CommentsPost/CommentsPost';
import OtherUser from './ComponentsMine/OtherUser/OtherUser';
import PersonalArea from './ComponentsMine/PersonalArea/PersonalArea';
import CommentsDscussion from './ComponentsMine/Discussions/ComponentDiscussions/CommentsDscussion';
import RegistrationOrLoginBox from '../Header/ComponentsHeader/ComponentsSwarchandSettings/ComponentsBoxDiscusion/RegistrationOrLogin/RegistrationOrLoginBox';
import Admin from '../Header/Admin/Admin';
import { Navigate } from 'react-router-dom';

class Mine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: !!localStorage.accessToken, // Проверяем наличие accessToken и устанавливаем состояние isLoggedIn
        };
    }
    state = {
        isLoggedIn: false
    }
    componentDidMount() {
        this.registration();
    }

    registration = () => {
        if (localStorage.accessToken !== undefined) {
            this.setState({ isLoggedIn: true });
        }
    }
    render() {//Тут базовый роутинг
        return (
            <div className='main' >
                <Routes>
                    <Route path='/RegistrationOrLoginBox' element={<RegistrationOrLoginBox />} />
                    {this.state.isLoggedIn ? (
                        <>{/*Защищенные*/}
                            <Route path='/AddPosts' element={<AddPosts />} />
                            <Route path='/AddDiscussions' element={<AddDiscussions />} />
                            <Route path='/PersonalArea/*' element={<PersonalArea />} />
                        </>
                    ) : (
                        // Перенаправление на страницу входа
                        <Route path='/*' element={<Navigate to='/RegistrationOrLoginBox' />} />
                    )
                    }
                    <Route path='/' element={<Posts />} />
                    <Route path='/Discussions' element={<Discussions />} />
                    <Route path='/AutorsProdject' element={<AutorsProdject />} />
                    <Route path='/SiteRules' element={<SiteRules />} />
                    <Route path='/DonatToAuthors' element={<DonatToAuthors />} />
                    <Route path='/CommentsPost/:postId' element={<CommentsPost />} />
                    <Route path='/OtherUser' element={<OtherUser />} />
                    <Route path='/CommentsDscussion' element={<CommentsDscussion />} />
                    <Route path='/Admin' element={<Admin />} />
                    
                </Routes>
            </div>
        )
    }
}
export default Mine