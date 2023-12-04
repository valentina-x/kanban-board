import React from 'react';
import Board from '../Board';
import Header from '../../Layouts/Header';
import Footer from '../../Layouts/Footer';
import BoardProvider from '../Board/context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskDetailPage from '../TaskDetailPage';

function App() {
  return (
    <BrowserRouter>
      <BoardProvider>
        <Header />
        <Routes>
          <Route
            path='/tasks/:taskId'
            element={
              <>
                <TaskDetailPage />
              </>
            }
          />
          <Route path='/' element={<Board />} />
        </Routes>
        <Footer />
      </BoardProvider>
    </BrowserRouter>
  );
}

export default App;
