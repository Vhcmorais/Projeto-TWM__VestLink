/*  APP'S TEST */

/* Importing the necessaries libraries */
import { render, screen } from '@testing-library/react';
import App from './App';

/* Defining test function */
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
