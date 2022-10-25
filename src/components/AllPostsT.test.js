import { render} from '@testing-library/react';
import AllPostsT from './AllPostsT';
//import ATP from './ATP';
//import Profile from './components/profile';
//import MyPostsT from './MyPostsT';



test('renders the mypostt', () => {
  render(AllPostsT);
  
  //expect(screen.getByRole("heading")).toHaveTextContent(/Doggy Directory/);
 // expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
 //expect(screen.getByRole("incorrectbtn", { name: "Incorrect" })).toBeDisabled();
  //expect(screen.getByRole("img")).toBeInTheDocument();
});