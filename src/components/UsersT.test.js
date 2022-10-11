import { render } from '@testing-library/react';
//import Profile from './profile';
import UsersT from './UsersT';



test('renders the profile', () => {
  render(<UsersT />);
  
  //expect(screen.getByRole("heading")).toHaveTextContent(/Doggy Directory/);
 // expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
 //expect(screen.getByRole("button", { name: "Sign In" })).toBeDisabled();
  //expect(screen.getByRole("img")).toBeInTheDocument();
});