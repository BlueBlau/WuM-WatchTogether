import React from "react";
import {Link} from "react-router-dom"

const HelpPageButton = () => {
    return(
    <div>
      <Link to="/help">
        <button>Help</button>
      </Link>
    </div>
    )
}

export default HelpPageButton;