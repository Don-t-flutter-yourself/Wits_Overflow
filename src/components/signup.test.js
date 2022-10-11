import { render,screen } from '@testing-library/react';
//import Profile from './components/profile';
import Signup from './signup';



test('renders the signup page', () => {
  render(<Signup/>);
  
  //expect(screen.getByRole("heading")).toHaveTextContent(/Wits Overflow/);
 // expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
  //expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  //expect(screen.getByRole("img")).toBeInTheDocument();
});