import { render } from '@testing-library/react';
import AllPostsT from './AllPostsT';
//import Profile from './components/profile';



test('renders the all posts', () => {
  render(<AllPostsT />);
  
  //expect(screen.getByRole("heading")).toHaveTextContent(/Doggy Directory/);
 // expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
 //expect(screen.getByRole("button", { name: "Sign In" })).toBeDisabled();
  //expect(screen.getByRole("img")).toBeInTheDocument();
});