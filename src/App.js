import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from '../src/Components/Home';
import Post from './Components/Posts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/post/:id"  element={<Post />} />
    </Routes>
    </Router>
  );
}

export default App;
