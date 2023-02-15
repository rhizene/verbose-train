import { screen } from '@testing-library/react';
import { renderWithProviders } from 'Testing/TestingUtils';
import App from './App';

test('renders learn react link', () => {
  renderWithProviders(<App />);
  const linkElement = screen.getByText(/log in/i);
  expect(linkElement).toBeInTheDocument();
});
