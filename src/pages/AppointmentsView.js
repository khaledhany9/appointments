import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Navbar from '../components/Navbar';
import AppointmentFormContainer from '../components/AppointmentFormContainerBasic'
import AppointmentCard from './../components/AppointmentCard';
import AppointmentCardContainer from './../components/AppointmentCardContainer'
import './AppointmentsView.css'

const StyledPaper = withStyles({
  root: {
    padding: '25px',
    background: '#212261',
    borderRadius: '0',
    height: '100%',
    display: 'flex',
    flex: 1,
    maxHeight: '100vh',
    ['@media (max-width:780px)']: {
      padding: '0',
    },
  },

})(Paper);



const styles = theme => ({
  addButton: {
    position: 'absolute',
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4,
    background: '#6265ff',
    color: 'white'
  },
});

class AppointmentsView extends React.PureComponent {
  constructor(props) {
    super(props);
    let appointments = localStorage.getItem("appointments")
    if (appointments !== null) {
        appointments = JSON.parse(appointments);
    } else {
        appointments = [];
    }

    this.state = {
      data: appointments,
      currentDate: new Date(),
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 9,
      endDayHour: 19,
      isNewAppointment: false,
    };

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainer, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
      } = this.state;

      const currentAppointment = data
        .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0]
        || addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false,
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
      };
    });
  }




  componentDidUpdate() {
    this.appointmentForm.update();
  }

  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    const { data, deletedAppointmentId } = this.state;
    const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);
    this.setState((state) => {
      return { data: nextData, deletedAppointmentId: null };
    }, () => {
        this.setLocalStorageItems(nextData)
    });
    this.toggleConfirmationVisible();
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }

      return { data, addedAppointment: {} };
    }, () => {
        if (deleted !== undefined) {
          this.setDeletedAppointmentId(deleted);
          this.toggleConfirmationVisible();
        }
        this.setLocalStorageItems(this.state.data)
    });
  }
  
  setLocalStorageItems = (data) => {
    localStorage.setItem("appointments", JSON.stringify(data))
  }

  changeCurrentDate = (newCurrentDate) => {
      this.setState({
          currentDate: newCurrentDate
      })
  }


  render() {
    const {
      currentDate,
      data,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour,
    } = this.state;
    const { classes } = this.props;
    

    return (
      <StyledPaper className="appointments-view-container">
        <div className="appointments-view-wrapper">
          <Navbar changeCurrentDate={this.changeCurrentDate} />
          <div className="appointments-table-container">
            <Scheduler className="appointments-table"
              data={data}
            >
              <ViewState
                currentDate={currentDate}
              />
              <EditingState
                onCommitChanges={this.commitChanges}
                onEditingAppointmentChange={this.onEditingAppointmentChange}
                onAddedAppointmentChange={this.onAddedAppointmentChange}
              />
              <DayView
                // startDayHour={9}
                // endDayHour={14}
              />
              <AllDayPanel />
              <EditRecurrenceMenu />
              <Appointments
              appointmentComponent={AppointmentCardContainer}
            appointmentContentComponent={AppointmentCard}
                />
              <AppointmentTooltip
                showOpenButton
                showCloseButton
                showDeleteButton
              />
              <AppointmentForm
                overlayComponent={this.appointmentForm}
                visible={editingFormVisible}
                onVisibilityChange={this.toggleEditingFormVisibility}
              />
              <DragDropProvider />
            </Scheduler>

            <Dialog
              open={confirmationVisible}
              onClose={this.cancelDelete}
            >
              <DialogTitle>
                Delete Appointment
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this appointment?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
                  Cancel
                </Button>
                <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>

            <Fab
              className={classes.addButton}
              onClick={() => {
                this.setState({ editingFormVisible: true });
                this.onEditingAppointmentChange(undefined);
                this.onAddedAppointmentChange({
                  startDate: new Date(currentDate).setHours(startDayHour),
                  endDate: new Date(currentDate).setHours(startDayHour + 1),
                });
              }}
            >
              <AddIcon />
            </Fab>
          
          </div>

        </div>
        
      </StyledPaper>
    );
  }
}

export default withStyles(styles, { name: 'EditingApp' })(AppointmentsView);
