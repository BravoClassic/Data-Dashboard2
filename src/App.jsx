import { useState, useEffect, useCallback } from "react";
import "./App.css";
import { Link } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [crypto, setCrypto] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCrypto, setFilteredCrypto] = useState([]);
  const [loading, setLoading] = useState(false);

  const setFetchedCrypto = useCallback((data) => {
    setCrypto(data); 
  }, []);

  const fetchCrypto = useCallback(async () => {
    setLoading(true);

    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en&x_cg_demo_api_key=${API_KEY}`
    );

    const data = await res.json();
    // console.log(data, "data from fetchCrypto")
    setFetchedCrypto(data);
    setLoading(false);
  }, [setFetchedCrypto])

  useEffect(() => {
    fetchCrypto().catch((err) => {
      console.log(err);
    });
    setFilteredCrypto(crypto);
    // console.log(crypto, "crypto2")
    // console.log(filteredCrypto, "filteredCrypto from useEffect")
  }, []);

  const searchCrypto = (e) => {
    setSearch(e.target.value);
    if (search === "") {

      setFilteredCrypto(crypto);
      setSearch(e.target.value);
      return;
    }

    setFilteredCrypto((prev) => {
      return prev.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  return (
    <>
      <div className="App">
        <h2>Cryptocurrency Dashboard</h2>
        <input
          type="search"
          placeholder="Search Cryptocurrency"
          // value={search}
          onChange={searchCrypto}
          className="cryptoSearchBar"
        />
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          search !== "" ?
          filteredCrypto.map((crypto) => {
            return (
              <div className='cryptoItem' key={crypto.id}>
               <img src={crypto.image} width={70} height={70} alt={crypto.name} />
              <p className="name">{crypto.name}</p>
              <p className="price">${crypto.current_price}</p>
              <Link to={`/${crypto.id}`}>View</Link>
              </div>
            )
          })
          : crypto && crypto.map((crypto) => {
            return (
              <div className='cryptoItem' key={crypto.id}>
               <img src={crypto.image} width={70} height={70} alt={crypto.name} />
              <p className="name">{crypto.name}</p>
              <p className="price">${crypto.current_price}</p>
              <Link to={`/${crypto.id}`}>View</Link>
          </div>
            )
          })

        )
      
        }
      </div>
    </>
  );
}

export default App;