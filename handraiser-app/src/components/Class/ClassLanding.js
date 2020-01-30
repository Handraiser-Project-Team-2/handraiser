import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// COMPONENTS
import CardPage from "./CardPage";
import FindClassDialog from "./FindClassDialog";

const useStyles = makeStyles(theme => ({
  fab: {
    float: "right"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  gridContainer: {
    paddingTop: "100px"
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function ClassLanding() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <AppBar style={{ backgroundColor: "#372476" }}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton edge="start" aria-label="menu">
              <MenuIcon style={{ color: "white" }} />
            </IconButton>
            <Typography variant="h6">Handraiser Admin</Typography>
          </div>
          <div>
            <IconButton
              aria-label="account of current user"
              edge="end"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle style={{ fontSize: 40 }} />
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* BODY */}
      <Container maxWidth="xl">
        <div className={classes.root}>
          <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item xs={12}>
              <FindClassDialog />
            </Grid>

            <Container maxWidth="lg" className={classes.flexy}>
              <CardPage />
              <CardPage />
              <CardPage />
              <CardPage />
              <CardPage />
              <CardPage />
            </Container>
          </Grid>
        </div>
      </Container>
      {/* END BODY */}
    </React.Fragment>
  );
}
