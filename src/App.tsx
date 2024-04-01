import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LayoutContainer } from './containers';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutContainer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
