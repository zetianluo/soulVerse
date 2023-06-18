import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import Home from "./home/Home";
import MUI from "./home/MUI";
import useLocationBlocker from "../../shared/functions/useLocationBlocker";

function Routing(props) {
  const { selectHome } = props;
  useLocationBlocker();
  return (
    <Switch>
      <PropsRoute path="/" component={Home} selectHome={selectHome} />
    </Switch>
  );
}

Routing.propTypes = {
  selectHome: PropTypes.func.isRequired,
};

export default memo(Routing);


// import React, { memo } from "react";
// import PropTypes from "prop-types";
// import { Switch } from "react-router-dom";
// import PropsRoute from "../../shared/components/PropsRoute";
// import Home from "./home/Home";
// import MUI from "./home/MUI";
// import useLocationBlocker from "../../shared/functions/useLocationBlocker";

// function Routing(props) {
//   const { selectMUI } = props;
//   useLocationBlocker();
//   return (
//     <Switch>
//       <PropsRoute path="/" component={MUI} selectHome={selectMUI} />
//     </Switch>
//   );
// }

// Routing.propTypes = {
//   selectMUI: PropTypes.func.isRequired,
// };

// export default memo(Routing);
