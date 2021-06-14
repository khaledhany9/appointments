import * as React from 'react';
import {
    Appointments,
  } from '@devexpress/dx-react-scheduler-material-ui';

const AppointmentCard = (props) => {
    return(
    <Appointments.AppointmentContent
      {...props}
    >
      {props.data.title}
    </Appointments.AppointmentContent>
  );}

  export default AppointmentCard ;