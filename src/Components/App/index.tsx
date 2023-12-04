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
      <Routes>
        <Route
          path='/tasks/:taskId'
          element={
            <>
              <BoardProvider>
                <Header />
                <TaskDetailPage />
                <Footer />
              </BoardProvider>
            </>
          }
        />
        <Route
          path='/'
          element={
            <BoardProvider>
              <Header />
              <Board />
              <Footer />
            </BoardProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
