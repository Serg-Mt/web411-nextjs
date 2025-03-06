import { useEffect, useState } from 'react'
import { User } from './User';

function FetchUser({ id }) {
  const
    [user, setUser] = useState(null),
    [error, setError] = useState(null);
  useEffect(() => {
    setUser(null);
    // setError(null);
    go();
    async function go() {
      try {
        const
          response = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
        if (!response.ok)
          throw new Error(response.status + ' ' + response.statusText);
        const
          u = await response.json();
        setUser(u);
        setError(null);
      } catch (error) {
        setError(error);
      }
    }
  },[id]);
  if (error)
    return <div className="error">Error: {String(error)}</div>;
  if (user)
    return <User user={user} />;
  return <Spinner />;
}

export function FetchDemo() {
  const
    [id, setId] = useState(1);
  return <>
    <h1>Fetch demo</h1>
    <input
      type="number"
      value={id}
      onInput={event => setId(event.target.value)} />
    <FetchUser id={id} />
  </>
}

function Spinner() {
  return <div className='spinner'>loading...</div>
}