import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <section className="sidebar">
        <ul className="navigation">
            <Link to={"/"}>
            <li>Home</li>
            </Link>
            <li>Search</li>
            <li>View</li>
        </ul>
    </section>
  )
}

export default Sidebar