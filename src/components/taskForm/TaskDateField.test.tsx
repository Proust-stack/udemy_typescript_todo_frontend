import React from 'react';
import { render, screen } from '@testing-library/react';
import { TaskDateField } from './TaskDateField';

test('renders description', () => {
  render(<TaskDateField />);
  const text = screen.getByLabelText(/task date/i);
  expect(text).toBeInTheDocument();
});
