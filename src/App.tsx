import Main from './components/Main/Main';
import Auth from './components/Auth/Auth';
import { useEffect, useState } from 'react';

const App = () => {
  const [token, setToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        Loading...
      </div>
    )
  }

  return (
    <div className="App">
      {
        token
        ?
        <Main />
        :
        <Auth setToken={setToken}/>
      }
    </div>
  );
};

export default App;
