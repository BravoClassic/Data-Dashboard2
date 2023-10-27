import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chart from "../components/Chart";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const Crypto = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [coinDetails, setCoinDetails] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch Crypto Market Data
    let fetchCrypto = async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=180&x_cg_demo_api_key=${API_KEY}`
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
  }, []);


  const back = () => {
    navigate(-1);
  };
  return (
    <Fragment>
      <div>
        <button onClick={back}>Back</button>
      </div>
      <h1>
        {coinDetails && coinDetails.name}{" "}
        {coinDetails && <img src={coinDetails.image.small} />}
      </h1>

      {coin && <Chart coin={coin} />}
      <p className="details" dangerouslySetInnerHTML={{__html:coinDetails?.description.en}}></p>
    </Fragment>
  );
};

export default Crypto;
