import React from 'react';
import Container from '../MessagesComponent/Container';
import useTitle from "../../hooks/useTitle"
function App() {
  useTitle("DRIMS | Messages")
  return (
      <Container />
  );
}

export default App;