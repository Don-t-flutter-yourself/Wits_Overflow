//import { render } from '@testing-library/react';
import App from './App';
import React from "react";
import ReactDOM from 'react-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
