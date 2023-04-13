import './App.css';
import Header from './components/header';
import Nav from './components/nav';
import ErrorPage from './components/errpg';
import Tasks from './components/tasks';
import Tiles from './components/tiles';
import Example from './components/example';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Header />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/tiles' element={<Tiles />} />
          <Route path='/demo' element={<Example />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
