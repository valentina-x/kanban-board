import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import Dropdown from '../Dropdown';
import BoardProvider from '../Board/context';

describe('Dropdown component', () => {
  const mockOptions = [
    { id: '1', content: 'Task 1' },
    { id: '2', content: 'Task 2' },
  ];

  const mockColumn = {
    id: 'column-2',
    title: 'Column 2',
    tasks: [],
  };

  const mockPrevColumn = 'column-1';

  it('renders Dropdown with options', async () => {
    const mockUpdateColumn = jest.fn();
    const mockUpdateBacklogTasks = jest.fn();

    const { getByLabelText } = render(
      <BoardProvider>
        <Dropdown options={mockOptions} column={mockColumn} prevcolumn={mockPrevColumn} />
      </BoardProvider>,
    );

    await waitFor(() => {
      expect(mockUpdateColumn).toHaveBeenCalledWith(
        mockColumn.id,
        expect.objectContaining({
          // Ожидаемые изменения в колонне
        }),
      );

      expect(mockUpdateBacklogTasks).toHaveBeenCalledWith(
        expect.arrayContaining([
          // Ожидаемые изменения в задачах "Backlog"
        ]),
      );
    });
  });
});
