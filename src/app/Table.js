/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle';


const styles = {
	largeIcon: {
		width: 60,
		height: 60,
	},
	large: {
		width: 120,
		height: 120,
		padding: 30,
	}
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});


class Table extends Component {


  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  }

  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
				<IconButton
					iconStyle={styles.largeIcon}
					style={styles.large}
					tooltip="ディエゴ"
					touch={true}
					tooltipPosition="top-left"
					>
					<AddCircle />
				</IconButton>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Table;
