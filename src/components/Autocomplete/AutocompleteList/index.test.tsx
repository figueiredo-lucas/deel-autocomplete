import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AutocompleteList from '.';

const noop = () => { }

test('renders an empty list', () => {
  render(<AutocompleteList textMatch={""} list={[]} onSelect={noop} />);
  const amountOfListItems = screen.queryAllByRole('listitem');
  expect(amountOfListItems).toHaveLength(0);
});

test('renders a list with no highlighted values', () => {
  render(<AutocompleteList textMatch={""} list={["Name 1", "Name 2"]} onSelect={noop} />);
  const amountOfListItems = screen.getAllByRole('listitem');
  expect(amountOfListItems).toHaveLength(2);
});

test('renders a list with one highlighted value', () => {
  const { container } = render(<AutocompleteList textMatch={"nam"} list={["Name 1", "Test 2"]} onSelect={noop} />);
  const highlightedEl = container.querySelector('.highlight');
  expect(highlightedEl).toHaveTextContent('Nam');
  const element = screen.getByText('Nam');
  expect(element).toEqual(highlightedEl);
  expect(element).toHaveClass('highlight');
});

test('selects a value on click', () => {
  const select = jest.fn();
  render(<AutocompleteList textMatch={"nam"} list={["Name 1", "Name 2"]} onSelect={select} />);
  fireEvent.click(screen.getAllByRole('listitem')[0]);
  expect(select).toHaveBeenCalledWith('Name 1');
});

test('selects a value on Enter', () => {
  const select = jest.fn();
  render(<AutocompleteList textMatch={"nam"} list={["Name 1", "Name 2"]} onSelect={select} />);
  fireEvent.keyDown(screen.getAllByRole('listitem')[1], { key: 'Enter', code: 'Enter', charCode: 13 })
  expect(select).toHaveBeenCalledWith('Name 2');
});

test('doesnt select a value if Enter is not pressed', () => {
  const select = jest.fn();
  render(<AutocompleteList textMatch={"nam"} list={["Name 1", "Name 2"]} onSelect={select} />);
  fireEvent.keyDown(screen.getAllByRole('listitem')[1], { key: 'Space', code: 'Space', charCode: 32 });
  expect(select).not.toHaveBeenCalled();
});