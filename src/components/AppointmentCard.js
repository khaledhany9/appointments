import * as React from 'react';
import {
    Appointments,
  } from '@devexpress/dx-react-scheduler-material-ui';
  import { makeStyles } from '@material-ui/core/styles';



  const useStyles = makeStyles(theme => ({
    card: {
      fontSize: '22px',
      minHeight: '50px'
    },
}));

const AppointmentCard = (props) => {
  const classes = useStyles();
    return(
    <Appointments.AppointmentContent
      {...props}
      className={classes.card}

    >
      {props.data.title}
    </Appointments.AppointmentContent>
  );}

  export default AppointmentCard ;