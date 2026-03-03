import { useState } from 'react'
import './App.css'
import CardContainer from './components/CardContainer/CardContainer'
import { Button } from 'antd';
import { Input } from 'antd';

function App() {

  return (
    <div className='container'>
      <header>Navbar</header>

      <main>
        <div className="search-bar">
          <Input style={{ width: '200px', height: '32px'  }} type="text" placeholder='Search items' />;

          <Button type="primary">Primary Button</Button>
        </div>
        
        <div>
          <CardContainer title="todo" tasks={tasks.filter(el => el.statusId = 1)}></CardContainer>
          <CardContainer title="progress"></CardContainer>
          <CardContainer></CardContainer>
          <CardContainer></CardContainer>
        </div>
      </main>


      <footer>Footer</footer>

    </div>
  )
}

export default App

