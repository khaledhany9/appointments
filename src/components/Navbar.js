import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import AppToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Datepicker from '../components/Datepicker';

const StyledAppBar = withStyles({
  colorPrimary: {
    background: '#6265ff',
  },
})(AppBar);



const useStyles = makeStyles((theme) => ({
    titleColumn: {
      display: 'inline-flex',
      alignItems: 'center',
      [theme.breakpoints.down("xs")]: {
        marginTop: theme.spacing(2),
      },
    },
    datepickerColumn: {
      textAlign: 'center',
      [theme.breakpoints.down("xs")]: {
        marginBottom: theme.spacing(2),
      },
    },
  }));

function Navbar(props) {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div>
      
        <StyledAppBar position="static">
          <AppToolbar>
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4} className={classes.titleColumn}>
            <Typography variant="h6" >
              My Appointments
            </Typography>
            </Grid>
            <Grid item xs={9} sm={4} className={classes.datepickerColumn}>
            <Datepicker changeCurrentDate={props.changeCurrentDate} />
            </Grid>
            <Grid item xs={3} sm={4} style={{textAlign: 'right'}}>
            {auth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>

            )}
            </Grid>
            
              </Grid>
          </AppToolbar>
        </StyledAppBar>
      </div>
    );
  }

  export default Navbar;