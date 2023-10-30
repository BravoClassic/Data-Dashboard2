import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";
import { Fragment } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = (coin) => {
    const { id } = useParams();
  const labels = coin.coin.prices.map((price) =>
    moment(price[0]).format("MMM DD YYYY")
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${id.toLocaleUpperCase()} Price History Chart`,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: `${id.toLocaleUpperCase()} `,
        data: coin.coin.prices.map((price) => {
          return price[1].toFixed(2);
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
//   console.log(labels, data);

  return (
    <Fragment>
      <Line options={options} data={data} />
      <p>Price of {id} for </p>
    </Fragment>
  );
};

export default Chart;


Chart.propTypes = {
  coint: PropTypes.object.isRequired,
  days: PropTypes.number.isRequired,
};