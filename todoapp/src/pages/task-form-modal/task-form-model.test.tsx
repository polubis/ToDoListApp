import React from 'react';
import { TaskFormData } from 'models/form-data';
import TaskFormModal from './task-form-modal';
import { render } from '@testing-library/react';

test('allows the user to login successfully', async () => {
  const initStateMock: { data: TaskFormData; id: number } = {
    data: { name: 'My new task', description: 'My new description', theme: { color: '#ffffff', background: '#cdsdsd' } },
    id: 1
  };

  const { getByTestId } = render(<TaskFormModal onClose={() => {}} initState={initStateMock} onSuccessResponse={() => {}} />);

  expect(getByTestId('dialog')).toBeTruthy();
});
