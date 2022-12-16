import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Autocomplete from '.';

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => { });
});

test('should render the input and label', async () => {
  await act(() => render(<Autocomplete label="Test" getFilteredList={async () => []} />));
  const label = screen.getByText('Test');
  const input = screen.getByRole('textbox');
  expect(label).toBeInTheDocument();
  expect(input).toBeInTheDocument();
});

test('should trigger useEffect upon text update and succeed on adding the list', async () => {
  const filteredList = jest.fn();
  await act(() => render(<Autocomplete label="Test" getFilteredList={filteredList} />));
  const input = screen.getByRole('textbox');
  filteredList.mockResolvedValueOnce(['Test 1', 'Test 2']);
  await act(() => fireEvent.change(input, { target: { value: 'tes' } }));
  expect(filteredList).toHaveBeenCalledWith('tes');
  expect(input).toHaveValue('tes');
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
});

test('should trigger useEffect upon text update and fail', async () => {
  const filteredList = jest.fn();
  await act(() => render(<Autocomplete label="Test" getFilteredList={filteredList} />));
  const input = screen.getByRole('textbox');
  filteredList.mockRejectedValue('Error');
  await act(() => fireEvent.change(input, { target: { value: 'tes' } }));
  expect(filteredList).toHaveBeenCalledWith('tes');
  expect(input).toHaveValue('tes');
  expect(screen.queryAllByRole('listitem')).toHaveLength(0);
});