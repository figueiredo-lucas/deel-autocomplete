import React, { useEffect, useState } from 'react'
import { hashCode } from '../../../utils';

type AutocompleteListProps = {
  textMatch: string;
  onSelect: (text: string) => void;
  maxResults?: number;
}

const TEST_LIST = ['Terry Medhurst', 'Sheldon Quigley', 'Terrill Hills', 'Miles Cummerata', 'Mavis Schultz', 'Alison Reichert', 'Oleta Abbott', 'Ewell Mueller', 'Demetrius Corkery', 'Eleanora Price', 'Marcel Jones', 'Assunta Rath', 'Trace Douglas', 'Enoch Lynch', 'Jeanne Halvorson', 'Trycia Fadel', 'Bradford Prohaska', 'Arely Skiles', 'Gust Purdy', 'Lenna Renner', 'Doyle Ernser', 'Tressa Weber', "Felicity O'Reilly", 'Jocelyn Schuster', 'Edwina Ernser', 'Griffin Braun', 'Piper Schowalter', 'Kody Terry', 'Macy Greenfelder', 'Maurine Stracke', 'Luciano Sauer', 'Kaya Emard', 'Lee Schmidt', 'Darien Witting', 'Jacklyn Schimmel', 'Angelica Baumbach', 'Delfina Ziemann', 'Thaddeus McCullough', 'Salvatore Fisher', 'Jasmin Hermiston', 'Nicklaus Cruickshank', 'Tiara Rolfson', 'Garret Klocko', 'Reginald Wisoky', 'Humberto Botsford', 'Justus Sipes', 'Coralie Boyle', 'Felicita Gibson', 'Pearl Blick', 'Johnathon Predovic'].sort((a, b) => a.localeCompare(b));

const AutocompleteList = ({ textMatch, onSelect, maxResults }: AutocompleteListProps) => {

  const [list, setList] = useState<string[]>(TEST_LIST);

  useEffect(() => {
    // should add a throttle
    if (textMatch) {
      setList(filterList(textMatch));
    } else {
      setList([]);
    }
  }, [textMatch]);

  const filterList = (textMatch: string): string[] =>
    TEST_LIST.filter(value => value.toLocaleLowerCase().includes(textMatch.toLocaleLowerCase()))

  const highlightOnMatch = (text: string) => {

    if (!textMatch) return { __html: text };
    const regex = new RegExp(`(${textMatch})`, 'gi');
    return { __html: text.replace(regex, `<span class="highlight">$1</span>`) };

    // I've left 2 solutions for this case.
    // Using the above one because I wont need to handle keys for the array built on the latter.
    // Could do some talking on which is better and easier to maintain. IMHO, first one is easier to maintain and read


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