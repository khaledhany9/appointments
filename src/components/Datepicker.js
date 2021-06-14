import * as React from 'react';
import { connectProps } from '@devexpress/dx-react-core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { withStyles } from '@material-ui/styles';



const styles = theme => ({
    root: {
        flexGrow: 1,
      },
  });
  

class Datepicker extends React.Component {
    state = {
        selectedDate: new Date('2014-08-18T21:11:54'),
    }
    handleDateChange = (date) => {
        this.setState({
          selectedDate: date
        })
      };
    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={3}>
                <Grid item xs={2}/>
                <Grid item xs={8} style={{textAlign: "center"}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={3}/>
                </Grid>
                </div>
        )
    }
}

    
    export default withStyles(styles)(Datepicker);