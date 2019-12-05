import React from 'react';
import TaskFormModal from './task-form-modal';
import { render } from '@testing-library/react';

test('allows the user to login successfully', async () => {
  const { getByTestId } = render(<TaskFormModal onClose={() => {}} taskToEdit={null} />);

  expect(getByTestId('dialog')).toBeTruthy();
});
