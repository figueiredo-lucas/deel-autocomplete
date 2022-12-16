import React, { ChangeEvent, useState } from 'react'
import AutocompleteList from './AutocompleteList';
import './style.css';

type AutocompleteProps = {
  label: string;
}

const Autocomplete = ({ label }: AutocompleteProps) => {
  const [text, setText] = useState('');

  return (
    <div className="autocomplete">
      <label htmlFor="autocomplete-input">{label}</label>
      <input
        id="autocomplete-input"
        type="text"
        value={text}
        onChange={(evt: ChangeEvent<HTMLInputElement>) => setText(evt.target.value)} />
      <AutocompleteList textMatch={text} onSelect={setText} maxResults={20} />
    </div>
  )
}

export default Autocomplete;