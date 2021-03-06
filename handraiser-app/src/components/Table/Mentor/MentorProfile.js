import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  gridCont: {
    marginTop: theme.spacing(1),
    borderRadius: "10px"
  },
  statsCont: {
    marginTop: theme.spacing(12)
  },
  profileCont: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: "20px"
  },
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    margin: theme.spacing(3),
    border: "8px solid #372476"
  },
  root: {
    flexGrow: 1
  },
  name: {
    "@media (max-width: 862px)": {
      textAlign: "center"
    }
  },
  helped: {
    textAlign: "center",
    borderRight: "1px solid lightgrey"
  },
  attended: {
    textAlign: "center",
    borderRight: "1px solid lightgrey"
  }
}));

export default function MentorProfile({ profileData, classData }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.gridCont}>
        <Grid item xs={12} sm={4}>
          <div className={classes.profileCont}>
            <Avatar
              alt="Remy Sharp"
              src={profileData.image}
              className={classes.avatar}
            />
            <Typography variant="h4" gutterBottom className={classes.name}>
              {`${profileData.first_name} ${profileData.last_name}`}
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              style={{ color: "forestgreen" }}
            >
              {
                (profileData.user_type_id === 1 ? "Super Admin" : null,
                profileData.user_type_id === 2 ? "Admin" : null,
                profileData.user_type_id === 3 ? "Student" : null,
                profileData.user_type_id === 4 ? "Mentor" : null)
              }
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
            <Grid className={classes.attended} item xs={12} sm={4}>
              <Typography variant="h3" gutterBottom>
                {Object.keys(classData).length}
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                style={{ color: "#372476" }}
              >
                Class Attended
              </Typography>
            </Grid>
            <Grid className={classes.helped} item xs={12} sm={4}>
              <Typography variant="h3" gutterBottom>
                {profileData.stud_helped}
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                style={{ color: "#372476" }}
              >
                Students Helped
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
              <Typography variant="h3" gutterBottom>
                {profileData.stud_handled}
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                style={{ color: "#372476" }}
              >
                Students Handled
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
