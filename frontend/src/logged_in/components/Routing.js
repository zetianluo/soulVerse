import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import withStyles from '@mui/styles/withStyles';
import Dashboard from "./dashboard/Dashboard";
import PropsRoute from "../../shared/components/PropsRoute";
import Old from "./chatbot/ChatbotVideo";
import Funeral from "./chatbot/Young/ChatbotVideoYoung";
import Young from "./chatbot/ChatbotVideo(after)";
import DataCenter from "./datacenter/DataCenter";
import useLocationBlocker from "../../shared/functions/useLocationBlocker";

const styles = (theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    width: "auto",
    [theme.breakpoints.up("xs")]: {
      width: "95%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "82.5%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "70%",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
});

function Routing(props) {
  const {
    classes,
    EmojiTextArea,
    ImageCropper,
    Dropzone,
    DateTimePicker,
    pushMessageToSnackbar,
    transactions,
    toggleAccountActivation,
    CardChart,
    statistics,
    targets,
    setTargets,
    isAccountActivated,
    selectDashboard,
    selectSubscription,
    selectOld,
    selectYoung,
    selectDataCenter,
    openAddBalanceDialog,
  } = props;
  useLocationBlocker();
  return (
    <div className={classes.wrapper}>
      <Switch>
        <PropsRoute
          path="/c/old"
          component={Old}
        />
        <PropsRoute
          path="/c/funeral"
          component={Funeral}
        />
        <PropsRoute
          path = "/c/young"
          component={Young}
        />
        <PropsRoute
          path = "/c/datacenter"
          component={DataCenter}
        />
        <PropsRoute
          path=""
          component={Dashboard}
          toggleAccountActivation={toggleAccountActivation}
          pushMessageToSnackbar={pushMessageToSnackbar}
          CardChart={CardChart}
          statistics={statistics}
          targets={targets}
          setTargets={setTargets}
          isAccountActivated={isAccountActivated}
          selectDashboard={selectDashboard}
        />
      </Switch>
    </div>
  );
}

Routing.propTypes = {
  classes: PropTypes.object.isRequired,
  EmojiTextArea: PropTypes.elementType,
  ImageCropper: PropTypes.elementType,
  Dropzone: PropTypes.elementType,
  DateTimePicker: PropTypes.elementType,
  pushMessageToSnackbar: PropTypes.func,
  setTargets: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleAccountActivation: PropTypes.func,
  CardChart: PropTypes.elementType,
  statistics: PropTypes.object.isRequired,
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
  isAccountActivated: PropTypes.bool.isRequired,
  selectDashboard: PropTypes.func.isRequired,
  selectSubscription: PropTypes.func.isRequired,
  openAddBalanceDialog: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Routing));
