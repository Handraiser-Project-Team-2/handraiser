import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  gridCont: {
    marginTop: theme.spacing(1),
    backgroundColor: "#eaeaea"
  },
  statsCont: {
    marginTop: theme.spacing(12)
  },
  profileCont: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4"
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: theme.spacing(3)
  },
  root: {
    flexGrow: 1
  }
}));

export default function StudentProfile({ profileData, classData }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.gridCont}>
        <Grid item xs={12} sm={4}>
          <div className={classes.profileCont} style={{ borderRadius: "20px" }}>
            <Avatar
              alt="Remy Sharp"
              src={profileData.image}
              className={classes.avatar}
            />
            <Typography variant="h4" gutterBottom>
              {`${profileData.first_name} ${profileData.last_name}`}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Student
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className={classes.statsCont}
          >
            <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
              <Typography variant="h3" gutterBottom>
                {Object.keys(classData).length}
              </Typography>
              <Typography variant="h5" gutterBottom>
                Class Attended
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
              <Typography variant="h3" gutterBottom>
                {profileData.all_request}
              </Typography>
              <Typography variant="h5" gutterBottom>
                Number of Request
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
              <Typography variant="h3" gutterBottom>
                {profileData.req_resolved}
              </Typography>
              <Typography variant="h5" gutterBottom>
                Request Resolved
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
