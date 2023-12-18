import React from 'react';
import Statistics from './ComponentsPersonalArea/Statistics';
import {Routes, Route} from 'react-router-dom';
import PersonalAccountMenu from './PersonalAccountMenu';
import EditPersonalData from './ComponentsPersonalArea/EditPersonalData';
import SavedDiscussions from './ComponentsPersonalArea/SavedDiscussions';
import SavedPosts from './ComponentsPersonalArea/SavedPosts';
import './PersonalArea.css';


class PersonalArea extends React.Component {
    render() {
        return (
            <div className='PersonalAreaBox'>
                <PersonalAccountMenu/>
                <Routes>
                    <Route path='Statistics' element={<Statistics/>}/>
                    <Route path='EditPersonalData' element={<EditPersonalData/>}/>
                    <Route path='SavedDiscussions' element={<SavedDiscussions/>}/>
                    <Route path='SavedPosts' element={<SavedPosts/>}/>
                </Routes>
            </div>
        )
    }
    
}

export default PersonalArea