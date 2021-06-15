import * as React from 'react';
import {
    Appointments,
  } from '@devexpress/dx-react-scheduler-material-ui';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    cardContainer: {
        background: '#8282fe',
        borderLeft: '5px solid #7979f0',
        '&:hover': {
            background: '#a6a6fa',

        }
    },
}));

const AppointmentCardContainer = (props) => {
    const classes = useStyles();
    return(
    <Appointments.Appointment
      {...props}
      className={classes.cardContainer}
    />
  );}

  export default AppointmentCardContainer ;