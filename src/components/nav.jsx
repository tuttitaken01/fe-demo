import { Link } from "react-router-dom";
import { Home } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function Nav() {
    return (
        <nav>
            <Link to='/' className="home"><IconButton aria-label="home"><Home /></IconButton></Link>
            <Link to='/tiles' className="tilelist">All Tiles</Link>
            <Link to='/tasks' className="tasklist">All Tasks</Link>
            <Link to='/demo' className="Example">Example</Link>
        </nav>
    )
}