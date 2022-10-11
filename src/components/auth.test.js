import { render} from '@testing-library/react';
import Auth from './auth';
//import Profile from './components/profile';
//import Signup from './signup';



test('renders the signup page', () => {
  render(<Auth/>);
  
  //expect(screen.getByRole("heading")).toHaveTextContent(/Sign Up/);
 // expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
  //expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  //expect(screen.getByRole("img")).toBeInTheDocument();
});