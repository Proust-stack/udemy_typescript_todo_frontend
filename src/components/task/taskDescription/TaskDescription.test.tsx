import React from 'react';
import { render, screen } from '@testing-library/react';
import { TaskDescription } from './TaskDescription';

test('renders default description with no props', () => {
  render(<TaskDescription />);
  const text = screen.getByText(/add description/i);
  expect(text).toBeInTheDocument();
});
