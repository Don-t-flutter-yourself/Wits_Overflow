import { render,screen } from '@testing-library/react';
import UsersPage from './usersPage';


//renders user page with image test
test('renders the userpage', () => {
  render(<UsersPage />);
  expect(screen.getByRole("img")).toBeInTheDocument();
});