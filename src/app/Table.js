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
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
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

	state = {
    open: false,
  };

	handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
		const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
				<IconButton
					iconStyle={styles.largeIcon}
					style={styles.large}
					tooltip="luke"
					touch={true}
					tooltipPosition="top-left"
					onTouchTap={this.handleOpen}
					>
					<AddCircle />
				</IconButton>
				<Dialog
					title="Dialog With Actions"
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					The actions in this window were passed in as an array of React objects.
					<form onSubmit={this.handleSubmit}>
						<DatePicker hintText="Landscape Inline Dialog" container="inline" mode="landscape" autoOk={true}/>
						<TimePicker	hintText="startTime" autoOk={true}/>
						<TimePicker	hintText="endTime" autoOk={true}/>
					</form>
				</Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Table;
