import React, { useState, useEffect, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useParams } from "react-router-dom";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Drawer from "@material-ui/core/Drawer";
import { Nav } from "../../Styles/Styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import { UserContext } from "../Contexts/UserContext";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Divider, Tooltip, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClassIcon from "@material-ui/icons/Class";
import CloseIcon from "@material-ui/icons/Close";
import io from "socket.io-client";
import LockIcon from "@material-ui/icons/Lock";
import TextField from "@material-ui/core/TextField";
import SchoolIcon from "@material-ui/icons/School";
import ListItemText from "@material-ui/core/ListItemText";
import StudentTabs from "../student/Tabs/Tabs";
import Bkg from "../images/classroom-background-clipart-11.jpg";
import MentorTabs from "../mentor/Tabs/Tabs";
const useStyles = makeStyles(theme => ({
  tab: {
    flexGrow: 1,
    width: "300px"
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  heading: {
    color: "black"
  },
  details: {
    "@media (min-width: 1440px)": {
      display: "none"
    }
  },
  members: {
    "@media (min-width: 1440px)": {
      display: "none"
    }
  },
  requests: {
    "@media (min-width: 770px)": {
      display: "none"
    }
  }
}));

export default function Topbar(props) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const [state, setState] = React.useState({
    left: false
  });
  var jwtDecode = require("jwt-decode");
  var decoded = jwtDecode(sessionStorage.getItem("token").split(" ")[1]);
  let history = useHistory();
  const [userProfile, setUserProfile] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user_id = decoded.userid;
  const { setData } = useContext(UserContext);
  const [expanded, setExpanded] = React.useState(false);
  let { class_id } = useParams();

  const panelDrawer = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const ENDPOINT = "localhost:5000";

  let socket = io(ENDPOINT);

  const toggleDrawer = (side, open) => event => {
    setState({ left: true, [side]: open });
  };

  const [classInfo, setClassInfo] = React.useState([]);

  useEffect(() => {
    getclassInfo();
    getClassMember();
  }, []);

  const getclassInfo = () => {
    if (class_id) {
      axios({
        method: "post",
        url: `/api/classinfo/${class_id}`
      })
        .then(res => {
          setClassInfo(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const [classMem, setClassMem] = useState([]);
  const [search, setSearch] = useState("");

  const getClassMember = () => {
    if (class_id) {
      axios({
        method: "get",
        url: `/api/classes/members/${class_id}`
      })
        .then(res => {
          setClassMem(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  const [tempClassMem, setTempClassMem] = useState([]);
  const classMembers = classMem.concat(classInfo);
  const handleSearch = e => {
    setSearch(e.target.value);
    const filteredMembers = classMembers.filter(
      el =>
        el.first_name.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
          -1 ||
        el.last_name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );
    setTempClassMem(filteredMembers);
  };

  console.log(props.rowDatahandler);

  const sideList = side => (
    <div role="presentation">
      <List style={{ minWidth: 150, maxWidth: 500 }}>
        <ListItem
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            backgroundColor: "#372476",
            color: "white",
            padding: "10px"
          }}
        >
          <span style={{ marginLeft: "10px" }}> PROFILE INFORMATION</span>
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={toggleDrawer("left", false)}
          />
        </ListItem>
        <Divider />
        <ListItem
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignContent: "flex-start",
            marginTop: "10px"
          }}
        >
          <Avatar className={classes.large} src={userProfile.image}></Avatar>
          <div
            style={{
              marginLeft: "20px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <span style={{ marginTop: 10, fontWeight: "bold" }}>
              {userProfile.first_name + " " + userProfile.last_name}
            </span>
            <span style={{ marginTop: 10, marginBottom: 10, color: "grey" }}>
              {userProfile.email}
            </span>
          </div>
        </ListItem>
        <Divider />
        {class_id ? (
          <ListItem>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ExpansionPanel
                expanded={expanded === "panel1"}
                onChange={panelDrawer("panel1")}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>Classes</Typography>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {classData.map(classList => {
                      return (
                        <List
                          key={classList.class_id}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            cursor: "pointer"
                          }}
                          onClick={() => {
                            cardClick(classList.class_id);
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "10px 10px 5px 5px"
                            }}
                          >
                            <SchoolIcon style={{ color: "#372476" }} />
                            <span style={{ paddingLeft: "10px" }}>
                              {classList.class_title}
                            </span>
                          </span>
                        </List>
                      );
                    })}
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>

              <ExpansionPanel
                expanded={expanded === "panel3"}
                onChange={panelDrawer("panel3")}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                  className={classes.details}
                >
                  <Typography className={classes.heading}>
                    Class Details
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {classInfo.map((info, index) => {
                    return (
                      <div
                        key={index}
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span
                          style={{
                            padding: "5px 10px 5px 10px",
                            color: "grey"
                          }}
                        >
                          Name
                        </span>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "10px 10px 5px 5px"
                          }}
                        >
                          <span>{info.class_title}</span>
                        </span>
                        <span
                          style={{
                            padding: "25px 10px 5px 10px",
                            color: "grey"
                          }}
                        >
                          Description
                        </span>
                        <span
                          style={{
                            padding: "10px 10px 8px 9px",
                            color: "darkblue"
                          }}
                        >
                          {info.class_description}
                        </span>
                        <span
                          style={{
                            padding: "25px 10px 5px 10px",
                            color: "grey"
                          }}
                        >
                          Date Created
                        </span>
                        <span style={{ padding: "10px 10px 8px 9px" }}>
                          {info.class_date_created}
                        </span>
                      </div>
                    );
                  })}
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel
                expanded={expanded === "panel4"}
                onChange={panelDrawer("panel4")}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel3a-header"
                  className={classes.members}
                >
                  <Typography className={classes.heading}>
                    Class Members
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails
                  style={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  {tempClassMem.length === 0
                    ? classMembers.map((member, index) => {
                        return (
                          <List key={index}>
                            <ListItem>
                              <Avatar
                                src={member.image}
                                style={{
                                  marginLeft: "-17px"
                                }}
                              ></Avatar>

                              {member.user_type_id === 4 ? (
                                <span
                                  style={{
                                    marginLeft: "8px",
                                    fontWeight: "bold"
                                  }}
                                >
                                  {member.first_name +
                                    " " +
                                    member.last_name +
                                    " (Mentor)"}
                                </span>
                              ) : (
                                <span
                                  style={{
                                    marginLeft: "8px",
                                    fontWeight: "bold"
                                  }}
                                >
                                  {member.first_name + " " + member.last_name}
                                </span>
                              )}

                              {member.user_status === 1 ? (
                                <status-indicator
                                  positive
                                  style={{
                                    marginLeft: "10px"
                                  }}
                                ></status-indicator>
                              ) : (
                                <status-indicator
                                  style={{
                                    marginLeft: "10px"
                                  }}
                                ></status-indicator>
                              )}
                            </ListItem>
                          </List>
                        );
                      })
                    : tempClassMem.map((member, index) => {
                        return (
                          <List key={index}>
                            <ListItem>
                              <Avatar
                                src={member.image}
                                style={{
                                  marginLeft: "-17px"
                                }}
                              ></Avatar>

                              {member.user_type_id === 4 ? (
                                <span
                                  style={{
                                    marginLeft: "8px",
                                    fontWeight: "bold"
                                  }}
                                >
                                  {member.first_name +
                                    " " +
                                    member.last_name +
                                    " (Mentor)"}
                                </span>
                              ) : (
                                <span
                                  style={{
                                    marginLeft: "8px",
                                    fontWeight: "bold"
                                  }}
                                >
                                  {member.first_name + " " + member.last_name}
                                </span>
                              )}

                              {member.user_status === 1 ? (
                                <status-indicator
                                  positive
                                  style={{
                                    marginLeft: "10px"
                                  }}
                                ></status-indicator>
                              ) : (
                                <status-indicator
                                  style={{
                                    marginLeft: "10px"
                                  }}
                                ></status-indicator>
                              )}
                            </ListItem>
                          </List>
                        );
                      })}
                  <div
                    className={classes.root}
                    style={{
                      display: "flex"
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      placeholder="Search member..."
                      fullWidth
                      onChange={e => handleSearch(e)}
                    />
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <div className={classes.requests}>
                {userProfile.user_type_id === 3 ? (
                  <StudentTabs
                    className={classes.student}
                    classReference={props.classReference}
                    rowDatahandler={props.rowDatahandler}
                  />
                ) : (
                  <MentorTabs
                    className={classes.mentor}
                    rowDatahandler={props.rowDatahandler}
                    class_id={props.class_id}
                    setSelection={props.setSelection}
                  />
                )}
              </div>
            </div>
          </ListItem>
        ) : (
          ""
        )}
      </List>
    </div>
  );

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    sessionStorage.setItem("token", "");
    history.push("/");
    setData();

    axios
      .patch(`/api/users/${user_id}`)
      .then(res => {
        Swal.fire({
          icon: "success",
          title: "Logged out successfully!"
        });
      })
      .then(data => {
        socket.emit("user_activity", {});
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get(`/api/userprofile/${user_id}`).then(res => {
      setUserProfile(res.data[0]);
    });
  }, []);

  let token = sessionStorage.getItem("token").split(" ")[1];
  const [userType, setUserType] = useState();

  const changeUserType = e => {
    setUserType(e.data.user_type_id);
  };

  useEffect(() => {
    fetchUserData();
    userType === 3 ? fetchMyClass() : fetchMentorClass();
  }, [userType]);

  const [tokState] = useState({ token: token });

  const fetchUserData = () => {
    axios({
      method: "post",
      url: `/api/user/data`,
      data: tokState
    })
      .then(data => {
        setData(data.data);
        changeUserType(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [classData, setClassData] = useState([]);

  // get all class relative to this mentor(if user is verified)
  const fetchMentorClass = () => {
    axios({
      method: "post",
      url: `/api/my/classes`,
      data: tokState
    })
      .then(data => {
        setClassData(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // get all class relative to student
  const fetchMyClass = () => {
    axios({
      method: "post",
      url: `/api/student/get/class`,
      data: tokState
    })
      .then(data => {
        // console.log(data.data);
        setClassData(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const cardClick = e => {
    if (userProfile.user_type_id === 3) {
      window.location = `/classroom/${e}`;
    }
    if (userProfile.user_type_id === 4) {
      window.location = `/classroom/${e}`;
    }
  };

  return (
    <Nav>
      <AppBar style={{ backgroundColor: "#372476" }}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon style={{ color: "white" }} />
            </IconButton>
            <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
              {sideList("left")}
            </Drawer>
            <Typography variant="h6">Handraiser</Typography>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <IconButton
              aria-label="account of current user"
              edge="end"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar alt="" src={userProfile.image} />
            </IconButton>
          </div>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem>
              <GoogleLogout
                clientId="239954847882-ilomcrsuv3b0oke6tsbl7ofajjb11nkl.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={() => Logout()}
              ></GoogleLogout>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <ToastContainer autoClose={1500} />
    </Nav>
  );
}
