import React from 'react';
import { render, screen } from '@testing-library/react';
import { Profile } from './Profile';

test('renders description', () => {
  render(<Profile />);
  const text = screen.getByText(/This is your personal tasks manager/i);
  expect(text).toBeInTheDocument();
});
test('renders welcome', () => {
  render(<Profile name="John" />);
  const text = screen.getByText(/Welcome, John/i);
  expect(text).toBeInTheDocument();
});
