import React, {useState} from 'react'
import { AppBar, Tabs, Tab, Menu, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  items: {
    fontSize: '20px',
    textDecoration: 'none',
    
    '&:hover': {
      color: "white",
   },
  },
   menuitems: {
    fontSize: '20px',
    textDecoration: 'none',
   },

  app:{
    backgroundColor:'black',
  },

  
}));

function NavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menu, setMenu] = useState('');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenu(event.target.innerHTML)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
    <AppBar className={classes.app} position="static">
      <Tabs onChange={handleChange} value={value}>
        <Tab label="Plasma Donor ⬇️" className={classes.items} onClick={handleClick}/>
      </Tabs>
    </AppBar>
    {
      (menu === 'Plasma Donor ⬇️') ? (
        <Menu
          id="hospital"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/*<MenuItem onClick={handleClose} className={classes.menuitems} component={Link} to="/bepositive">Plasma Info</MenuItem>*/}
          <MenuItem onClick={handleClose} className={classes.menuitems} component={Link} to="/bepositive/donateblood">Donate Plasma</MenuItem>
          <MenuItem onClick={handleClose} className={classes.menuitems} component={Link} to="/bepositive/getdonors">Donors List</MenuItem>
        </Menu>
      ):(
        <div></div>
      )
    }
    
    </div>
  )
}

export default NavBar
