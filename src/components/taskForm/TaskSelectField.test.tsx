import { render, screen } from '@testing-library/react';
import { TaskSelectField } from './TaskSelectField';
import React from 'react';

test('renders status select title by default', () => {
  render(<TaskSelectField />);
  const text = screen.getByTestId('select');
  console.log(text);
  expect(text).toBeInTheDocument();
});
