import React, { memo, useCallback, useState, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from '@mui/styles/withStyles';
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages from "../../shared/components/ConsecutiveSnackbarMessages";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";

const styles = (theme) => ({
  main: {
    marginLeft: theme.spacing(9),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
});

function Main(props) {
  const { classes } = props;
  const [selectedTab, setSelectedTab] = useState(null);
  const [CardChart, setCardChart] = useState(null);
  const [hasFetchedCardChart, setHasFetchedCardChart] = useState(false);
  // const [EmojiTextArea, setEmojiTextArea] = useState(null);
  // const [hasFetchedEmojiTextArea, setHasFetchedEmojiTextArea] = useState(false);
  // const [ImageCropper, setImageCropper] = useState(null);
  // const [hasFetchedImageCropper, setHasFetchedImageCropper] = useState(false);
  // const [Dropzone, setDropzone] = useState(null);
  // const [hasFetchedDropzone, setHasFetchedDropzone] = useState(false);
  // const [DateTimePicker, setDateTimePicker] = useState(null);
  // const [hasFetchedDateTimePicker, setHasFetchedDateTimePicker] = useState(
  //   false
  // );
  // const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({ views: [], profit: [] });
  const [posts, setPosts] = useState([]);
  const [targets, setTargets] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isAccountActivated, setIsAccountActivated] = useState(false);
  // const [isAddBalanceDialogOpen, setIsAddBalanceDialogOpen] = useState(false);
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);

  // const openAddBalanceDialog = useCallback(() => {
  //   setIsAddBalanceDialogOpen(true);
  // }, [setIsAddBalanceDialogOpen]);

  const toggleAccountActivation = useCallback(() => {
    if (pushMessageToSnackbar) {
      if (isAccountActivated) {
        pushMessageToSnackbar({
          text: "Your account is now deactivated.",
        });
      } else {
        pushMessageToSnackbar({
          text: "Your account is now activated.",
        });
      }
    }
    setIsAccountActivated(!isAccountActivated);
  }, [pushMessageToSnackbar, isAccountActivated, setIsAccountActivated]);


  const selectDashboard = useCallback(() => {
    smoothScrollTop();
    document.title = "WaVer - Dashboard";
    setSelectedTab("Dashboard");
    if (!hasFetchedCardChart) {
      setHasFetchedCardChart(true);
      import("../../shared/components/CardChart").then((Component) => {
        setCardChart(Component.default);
      });
    }
  }, [
    setSelectedTab,
    setCardChart,
    hasFetchedCardChart,
    setHasFetchedCardChart,
  ]);

  const selectOld = useCallback(() => {
    smoothScrollTop();
    document.title="ComeTrue - Old";
    setSelectedTab("Old");
  },[setSelectedTab])

  const selectYoung = useCallback(() => {
    smoothScrollTop();
    document.title="ComeTrue - Young";
    setSelectedTab("Young");
  },[setSelectedTab])

  const selectFuneral = useCallback(() => {
    smoothScrollTop();
    document.title="ComeTrue - Funeral";
    setSelectedTab("Funeral");
  },[setSelectedTab])

  const getPushMessageFromChild = useCallback(
    (pushMessage) => {
      setPushMessageToSnackbar(() => pushMessage);
    },
    [setPushMessageToSnackbar]
  );

  return (
    <Fragment>
      <NavBar
        selectedTab={selectedTab}
        messages={messages}
        // openAddBalanceDialog={openAddBalanceDialog}
      />
      <ConsecutiveSnackbarMessages
        getPushMessageFromChild={getPushMessageFromChild}
      />
      <main className={classNames(classes.main)}>
        <Routing
          isAccountActivated={isAccountActivated}
          // ImageCropper={ImageCropper}
          // EmojiTextArea={EmojiTextArea}
          CardChart={CardChart}
          // Dropzone={Dropzone}
          // DateTimePicker={DateTimePicker}
          toggleAccountActivation={toggleAccountActivation}
          pushMessageToSnackbar={pushMessageToSnackbar}
          // transactions={transactions}
          statistics={statistics}
          posts={posts}
          targets={targets}
          selectDashboard={selectDashboard}
          selectOld={selectOld}
          selectYoung={selectYoung}
          selectFuneral={selectFuneral}
          // openAddBalanceDialog={openAddBalanceDialog}
          setTargets={setTargets}
          setPosts={setPosts}
        />
      </main>
    </Fragment>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
