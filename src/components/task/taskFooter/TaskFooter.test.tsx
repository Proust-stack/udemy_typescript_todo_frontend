import React from 'react';
import { render, screen } from '@testing-library/react';
import { TaskFooter } from './TaskFooter';

test('renders default description with no props', () => {
  render(<TaskFooter id="123" />);
  const text = screen.getByText(/Mark complete/i);
  expect(text).toBeInTheDocument();
});
