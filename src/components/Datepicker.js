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
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const datepickerTheme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      root: {
        color: 'white',
        border: '0'
      },
      input: {
        height: '10px',
      },
    },
    MuiOutlinedInput: {
      root: {
        backgroundColor: "#8282fe",
        borderRadius: '50px',

      },
    },
    MuiIconButton: {
      root: {
        color: 'inherit'
      },
    },

    MuiFormControl: {
      marginNormal: {
        marginTop: '0',
        marginBottom: '0'
      },
    },


  },
});



const styles = theme => ({
    root: {
        flexGrow: 1,
      },
  });
  

class Datepicker extends React.Component {
    state = {
        selectedDate: new Date(),
    }
    handleDateChange = (date) => {
        this.setState({
          selectedDate: date
        })
        this.props.changeCurrentDate(date)
      };
    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
               <ThemeProvider theme={datepickerTheme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <KeyboardDatePicker
                    inputVariant="outlined"
                    label={false}
                    margin="normal"
                    format="MM/dd/yyyy"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </MuiPickersUtilsProvider>
                </ThemeProvider>
                </div>
        )
    }
}

    
    export default withStyles(styles)(Datepicker);