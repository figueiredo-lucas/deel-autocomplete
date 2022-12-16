import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

const MOCK_RES = {
  users: [{
    id: 1,
    firstName: "Test",
    lastName: "1"
  },
  {
    id: 2,
    firstName: "Name",
    lastName: "2"
  }]
};

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => { });
});

test('renders the page with the input', async () => {
  const mRes = { json: jest.fn().mockResolvedValueOnce({ users: [] }) };
  const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
  global.fetch = mockedFetch;
  await act(() => render(<App />));
  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
});

test('renders the page but fails to fetch', async () => {
  const mockedFetch = jest.fn().mockRejectedValueOnce('Error');
  global.fetch = mockedFetch;
  await act(() => render(<App />));
  const input = screen.getByRole('textbox');
  const alert = screen.getByRole('alert');
  expect(input).toBeInTheDocument();
  expect(alert).toBeInTheDocument();
  expect(alert).toHaveTextContent('Failed to fetch data from dummyjson API. For more information check logs.');
});

// this is throwing an warning for the non-usage of `act`. Which happens because of the async call of the filterList function.
// I feel that the best approach would be to have the filterList tested somewhere else and the whole inner component mocked.
// In here i didnt mock the inner component so i could see the upgrades.
// Even with the warning the screen gets updated normally, that's why i can check the length of list items and the text content.
// even though it shows this warning, this test covers what it should and something more (because it shouldn't be needed to trigger the inner useEffect)
test('filters the list on input change', async () => {
  const mRes = { json: jest.fn().mockResolvedValueOnce(MOCK_RES) };
  const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
  global.fetch = mockedFetch;
  await act(() => render(<App />));
  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
  await act(() => fireEvent.change(input, { target: { value: 'tes' } }));
  const listitems = await screen.findAllByRole('listitem');
  expect(input).toHaveValue('tes');
  expect(listitems).toHaveLength(1);
  expect(listitems[0]).toHaveTextContent('Test 1');
});