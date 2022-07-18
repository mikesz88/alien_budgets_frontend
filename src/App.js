import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Hero from './features/Hero';
import Student from './features/Student';
import Adult from './features/Adult';
import AdultLogin from './features/Adult/login';
import StudentLogin from './features/Student/login';

const App = () => (
  <ThemeProvider theme={theme}>
    {/* test */}
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} exact />
        <Route path="/student" element={<Student />} exact />
        <Route path="/student/login" element={<StudentLogin />} exact />
        <Route path="/adult" element={<Adult />} exact />
        <Route path="/adult/login" element={<AdultLogin />} exact />
      </Routes>
    </Router>
  </ThemeProvider>
);

export default App;
