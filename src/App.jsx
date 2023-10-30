import { useState, useEffect } from "react";
import "./App.css";
import { Link, Outlet, useParams } from "react-router-dom";
import Sidebar from "./components/Sidebar";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [crypto, setCrypto] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCrypto, setFilteredCrypto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { id } = useParams();

  // const setFetchedCrypto = useCallback((data) => {
  //   setCrypto(data);
  // }, []);

  const fetchCrypto = async () => {
    setLoading(true);

    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en&x_cg_demo_api_key=${API_KEY}`
    );

    const data = await res.json();
    // console.log(data, "data from fetchCrypto")
    setCrypto(data);
    setLoading(false);
  };

  useEffect(() => {
    setFilteredCrypto("");
    fetchCrypto().catch((err) => {
      console.log(err);
    });
    setFilteredCrypto(crypto);
    // console.log(crypto, "crypto2")
    // console.log(filteredCrypto, "filteredCrypto from useEffect")
  }, [id]);

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

  const handlePage = () => {
    setPage((prev) => prev + 1);
  }

  return (
    <>
      <div className="App">
        <Sidebar />
        {id ? (
          <Outlet />
        ) : (
          <div className="crypto-section">
            <h1 className="cryptoTitle">Cryptocurrency Dashboard</h1>
            <input
              type="search"
              placeholder="Search Cryptocurrency"
              // value={search}
              onChange={searchCrypto}
              className="cryptoSearchBar"
            />
            {loading ? (
              <h1>Loading...</h1>
            ) : search !== "" ? (
              filteredCrypto.map((crypto) => {
                return (
                  <div className="cryptoItem" key={crypto.id}>
                    <img
                      src={crypto.image}
                      width={70}
                      height={70}
                      alt={crypto.name}
                    />
                    <p className="name">{crypto.name}</p>
                    <p className="price">${crypto.current_price}</p>
                    <Link to={`/${crypto.id}`}>View</Link>
                  </div>
                );
              })
            ) : (
              crypto &&
              crypto.slice(0,(page-1)*10+10).map((crypto) => {
                return (
                  <div className="cryptoItem" key={crypto.id}>
                    <img
                      src={crypto.image}
                      width={70}
                      height={70}
                      alt={crypto.name}
                    />
                    <p className="name">{crypto.name}</p>
                    <p className="price">${crypto.current_price}</p>
                    <Link to={`/${crypto.id}`}>View</Link>
                  </div>
                );
                
              })
              
            )}
           { !search && <button className="more" onClick={() => handlePage()}>View More</button>
}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
