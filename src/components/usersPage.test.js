import { render,screen } from '@testing-library/react';
//import Profile from './components/profile';
import UsersPage from './usersPage';



test('renders the userpage', () => {
  render(<UsersPage />);
  expect(screen.getByRole("img")).toBeInTheDocument();
});