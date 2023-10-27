import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
const Crypto = (item,key) => {
  return (
    <div className='cryptoItem' key={key}>
        <p>{item.name}</p>
        <p>{item.priceUsd}</p>
        <Link to={""}>View</Link>
    </div>
  )
}

export default Crypto

Crypto.propTypes = {
    item: PropTypes.object,
    key: PropTypes.number
}

Crypto.defaultProps = {
    item: {},
    key: 0
}