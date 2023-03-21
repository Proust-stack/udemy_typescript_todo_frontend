import React from 'react';
import { render, screen } from '@testing-library/react';
import { TaskHeader } from './TaskHeader';

test('renders default title with no props', () => {
  render(<TaskHeader />);
  const text = screen.getByText(/Default title/i);
  expect(text).toBeInTheDocument();
});
