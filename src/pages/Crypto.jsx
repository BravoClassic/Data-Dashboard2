import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import Chart from "../components/Chart";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const Crypto = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [days, setDays] = useState(1); 
  const [coinDetails, setCoinDetails] = useState(null);
  useEffect(() => {
    // Fetch Crypto Market Data
    let fetchCrypto = async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&x_cg_demo_api_key=${API_KEY}`
      );

      const data = await res.json();
      setCoin(data);
    };

    fetchCrypto().catch(console.error);

    // Fetch Crypto Details
    const fetchCryptoDetails = async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=${API_KEY}`
      );

      const data = await res.json();
      setCoinDetails(data);
    };
    fetchCryptoDetails().catch(console.error);
    //   console.log(coin)
  }, [days, id]);

  const handleDays = (e) => {
    setDays(e.target.value);
  }
  
  return (
    <div className="crypto-item">
      
      <h1>
        {coinDetails && coinDetails.name}{" "}
        {coinDetails && <img src={coinDetails.image.small} />}
      </h1>

      {coin && <Chart coin={coin} days={days} />}
      <select className="select-days" onChange={handleDays}>
        <option value="1">1 Day</option>
        <option value="30">30 Days</option>
        <option value="180">3 Months</option>
      </select>
      <p className="details" dangerouslySetInnerHTML={{__html:coinDetails?.description.en}}></p>      
    </div>
  );
};

export default Crypto;
