import React from 'react';
import { render, screen } from '@testing-library/react';
import { TaskDescriptionField } from './TaskDescriptionField';

test('renders description', () => {
  render(<TaskDescriptionField />);
  const text = screen.getByLabelText(/description/i);
  expect(text).toBeInTheDocument();
});
