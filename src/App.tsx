import React, { useEffect, useState } from 'react';
import './App.css';
import Alert from './components/Alert';
import Autocomplete from './components/Autocomplete';

const TEST_LIST = ['Terry Medhurst', 'Sheldon Quigley', 'Terrill Hills', 'Miles Cummerata', 'Mavis Schultz', 'Alison Reichert', 'Oleta Abbott', 'Ewell Mueller', 'Demetrius Corkery', 'Eleanora Price', 'Marcel Jones', 'Assunta Rath', 'Trace Douglas', 'Enoch Lynch', 'Jeanne Halvorson', 'Trycia Fadel', 'Bradford Prohaska', 'Arely Skiles', 'Gust Purdy', 'Lenna Renner', 'Doyle Ernser', 'Tressa Weber', "Felicity O'Reilly", 'Jocelyn Schuster', 'Edwina Ernser', 'Griffin Braun', 'Piper Schowalter', 'Kody Terry', 'Macy Greenfelder', 'Maurine Stracke', 'Luciano Sauer', 'Kaya Emard', 'Lee Schmidt', 'Darien Witting', 'Jacklyn Schimmel', 'Angelica Baumbach', 'Delfina Ziemann', 'Thaddeus McCullough', 'Salvatore Fisher', 'Jasmin Hermiston', 'Nicklaus Cruickshank', 'Tiara Rolfson', 'Garret Klocko', 'Reginald Wisoky', 'Humberto Botsford', 'Justus Sipes', 'Coralie Boyle', 'Felicita Gibson', 'Pearl Blick', 'Johnathon Predovic'].sort((a, b) => a.localeCompare(b));

type DummyJsonResponse = {
  id: number;
  firstName: string;
  lastName: string;
};

function App() {

  const [baseList, setBaseList] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBaseList = async () => {
      // fetching just once for speed and because the dummyjson have the /search endpoint but it just searches for one of the names so for example:
      // doing like /users/search?q=terry%20m didn't bring any results. I might be doing wrong, but that's it
      try {
        const response = await fetch(`https://dummyjson.com/users?limit=100&select=firstName,lastName`);
        const list: { users: DummyJsonResponse[] } = await response.json();
        setBaseList(list.users.map(v => `${v.firstName} ${v.lastName}`));
      } catch (err) {
        console.error(err);
        // added this just as a fallback to present the list regardless of the outcome of the fetch call
        setBaseList(TEST_LIST);
        setError(`Failed to fetch data from dummyjson API. For more information check logs.`);
      }
    }

    fetchBaseList();
  }, [])

  // in a real scenario, this would be a good place to use the fetch, so it fetches from backend on every time a user types something,
  // but it also relies on adding the debounce so backend doesn't get spammed with calls
  // that's why i left as async so it mimics a promise scenario.
  const filterList = async (textMatch: string): Promise<string[]> =>
    baseList.filter(value => value.toLocaleLowerCase().includes(textMatch.toLocaleLowerCase()));

  return (
    <div className="App">
      {error && <Alert text={error} onClose={() => setError('')} />}
      <Autocomplete label="Find a name" getFilteredList={filterList} />
    </div>
  );
}

export default App;
