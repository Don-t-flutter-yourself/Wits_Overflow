import { render, screen } from '@testing-library/react';
//import Profile from './components/profile';
import Signin from './signin';



test('renders the signin page', () => {
  render(<Signin />);
  
  //expect(screen.getByRole("heading")).toHaveTextContent(/Doggy Directory/);
 // expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
 //expect(screen.getByRole("button", { name: "Sign In" })).toBeDisabled();
  //expect(screen.getByRole("img")).toBeInTheDocument();
});