import React, { ChangeEvent, useEffect, useState } from 'react'
import AutocompleteList from './AutocompleteList';
import './style.css';

type AutocompleteProps = {
  label: string;
  getFilteredList: (textMatch: string) => Promise<string[]>
}

const Autocomplete = ({ label, getFilteredList }: AutocompleteProps) => {
  const [text, setText] = useState('');
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    const filter = async () => {
      try {
        if (text) {
          const data = await getFilteredList(text);
          setList(data);
        } else {
          setList([]);
        }
      } catch (err) {
        // would need to show this error (or a more user friendly one) somewhere informing the user that the filtering didnt work
        console.log(err);
        setList([]);
      }
    }

    // should add a debounce so it doesnt trigger every keystroke
    filter();
  }, [text]);

  return (
    <div className="autocomplete">
      <label htmlFor="autocomplete-input">{label}</label>
      <input
        id="autocomplete-input"
        type="text"
        value={text}
        onChange={(evt: ChangeEvent<HTMLInputElement>) => setText(evt.target.value)} />
      <AutocompleteList textMatch={text} list={list} onSelect={setText} maxResults={20} />
    </div>
  )
}

export default Autocomplete;