import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import App from './App';

test('renders header with name', () => {
  render(<App />);
  const headerElement = screen.getByText(/Andrew Zhou/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const vlogListLink = screen.getByText(/Vlog List/i);
  const addVlogLink = screen.getByText(/Add Vlog/i);
  const registerUserLink = screen.getByText(/Register User/i);

  expect(vlogListLink).toBeInTheDocument();
  expect(addVlogLink).toBeInTheDocument();
  expect(registerUserLink).toBeInTheDocument();
});
