import { render} from '@testing-library/react';
import Navbar from './navbar';


//makes sure the components of the navbar are rendered correctly
test('renders the navigation bar', () => {
  render(<Navbar />);
  
});