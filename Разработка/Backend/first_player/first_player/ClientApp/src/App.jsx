//импортируем необходимые файлы
import React from 'react';
import Header from './components/Header/Header';
import Futher from './components/Futher/Futher';
import Mine from './components/Mine/Mine';
import Sidebar from './components/Aside/Sidebar';
import './CSS/null.css';
import './CSS/default.css';

//Основной класс интерфейса(к нему подключаются остальные)
class App extends React.Component {
  
  render() {
    return (
      <div className="body">
        <Header />
        <div className='BoxTBox'>
        <div className='TBox'>
          <Mine />
          <Sidebar />
        </div>
        </div>
        <Futher />
      </div>
    )
  }
}
export default App