import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  statsCont:{
    marginTop: theme.spacing(12)
  },
  profileCont: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
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

export default function MentorProfile({ profileData }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <div className={classes.profileCont}>
            <Avatar
              alt="Remy Sharp"
              src={profileData.image}
              className={classes.avatar}
            />
            <Typography variant="h4" gutterBottom>
              {`${profileData.first_name} ${profileData.last_name}`}
            </Typography>
            <Typography variant="h6" gutterBottom>
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
            <Grid item xs={12} sm={4} style={{textAlign: 'center'}}>
              <Typography variant="h3" gutterBottom>
                12
              </Typography>
              <Typography variant="h5" gutterBottom>
                Class Attended
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} style={{textAlign: 'center'}}>
              <Typography variant="h3" gutterBottom>
                2323
              </Typography>
              <Typography variant="h5" gutterBottom>
                Students Helped
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} style={{textAlign: 'center'}}>
              <Typography variant="h3" gutterBottom>
                2323
              </Typography>
              <Typography variant="h5" gutterBottom>
                Students Handled
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
