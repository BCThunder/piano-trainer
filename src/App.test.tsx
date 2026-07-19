import { render, screen } from '@testing-library/react';
import App from './App';

test('renders note recognition button', () => {
  render(<App />);
  const noteRecognitionButton = screen.getByRole('button', { name: /Note Recognition/ })
  expect(noteRecognitionButton).toBeInTheDocument();
});

test('renders scales button', () => {
  render(<App />);
  const scalesButton = screen.getByRole('button', { name: /Scales/ })
  expect(scalesButton).toBeInTheDocument();
})
