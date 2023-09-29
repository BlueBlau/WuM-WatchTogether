import React from "react";
import {Link} from "react-router-dom"

//HelpPageButtonComponente -> nur ein Button, der auf die HilfeSeite führt
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