import React from 'react';
import { render, screen } from '@testing-library/react';
import { TaskCounter } from './TaskCounter';
import { Status } from '../taskForm/enums/Status';

test('renders completed status by default', () => {
  render(<TaskCounter />);
  const text = screen.getByText(/completed/i);
  expect(text).toBeInTheDocument();
});
test('renders "in progress" status by entering "in progress"', () => {
  render(<TaskCounter status={Status.inProgress} />);
  const text = screen.getByText(/In progress/i);
  expect(text).toBeInTheDocument();
});
