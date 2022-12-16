import React from 'react'
import { hashCode } from '../../../utils';

type AutocompleteListProps = {
  textMatch: string;
  list: string[];
  onSelect: (text: string) => void;
  maxResults?: number;
}

const AutocompleteList = ({ textMatch, list, onSelect, maxResults }: AutocompleteListProps) => {

  const highlightOnMatch = (text: string) => {

    if (!textMatch) return { __html: text };
    const regex = new RegExp(`(${textMatch})`, 'gi');
    return { __html: text.replace(regex, `<span class="highlight">$1</span>`) };

    // I've left 2 solutions for this case.
    // Using the above one because I wont need to handle keys for the array built on the latter.
    // Could do some talking on which is better and easier to maintain.
    // IMHO, first one is easier to maintain and read at the cost of using the dangerouslySetInnerHTML

    // if (!textMatch) return text;
    // const matchLen = textMatch.length;
    // const parts = [];
    // const regex = new RegExp(textMatch, 'gi');
    // let match = undefined;
    // let prevIdx = 0;
    // let currIdx = undefined;
    // do {
    //   match = regex.exec(text);
    //   if (match) {
    //     currIdx = match.index;
    //     parts.push(text.substring(prevIdx, currIdx));
    //     parts.push(<span className="highlight">{text.substring(currIdx, currIdx + matchLen)}</span>);
    //     prevIdx = currIdx + matchLen;
    //   }
    // } while (match);
    // parts.push(text.substring(prevIdx));
    // return <>{parts}</>;
  }

  const onKeyDownSelection = (text: string) => (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSelect(text);
    }
  }

  const getListItem = (text: string) =>
    <li key={hashCode(text)}
      tabIndex={0}
      onKeyDown={onKeyDownSelection(text)}
      onClick={() => onSelect(text)}
      dangerouslySetInnerHTML={highlightOnMatch(text)}>
    </li>

  return (
    <div className="item-list-wrapper">
      <ul className="item-list">
        {list.slice(0, maxResults).map(getListItem)}
      </ul>
    </div>
  )
}

export default AutocompleteList;