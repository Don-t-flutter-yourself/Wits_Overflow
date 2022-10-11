import { render } from '@testing-library/react';
import Dashboard from './dashboard';


//tests the rendering of dashboard to the page
test('renders the dashboard', () => {
  render(<Dashboard />);
  
});