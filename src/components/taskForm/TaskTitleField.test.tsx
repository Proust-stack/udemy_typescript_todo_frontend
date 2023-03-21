import React from 'react';
import { render, screen } from '@testing-library/react';
import { TaskTitleField } from './TaskTitleField';

test('renders description', () => {
  render(<TaskTitleField />);
  const text = screen.getByLabelText(/title/i);
  expect(text).toBeInTheDocument();
});
