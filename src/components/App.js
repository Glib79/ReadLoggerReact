import React from 'react';
import Routes from '../config/Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ShowMessages from './support/ShowMessages';
import StatusBar from './template/StatusBar';


const App = () => {
  return (
    <Router>
      <ShowMessages />
      <StatusBar />
      <Container>
        <Routes />
      </Container>
    </Router>
  );
}

export default App;
