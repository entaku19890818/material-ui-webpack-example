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
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import request from 'superagent';



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


class Facility extends Component {

	state = {
    open: false,
		value: 'Please write an essay about your favorite DOM element.'
  };

	handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

	handleSubmit = (e) => {
		e.preventDefault();
    this.setState({value: "OK"});
		request
		  .post('http://localhost:3100/add')
			.type('form')
		  .send({"id": 1,
    "stertdate": "2017-04-24",
		"enddate": "2017-04-24",
    "starttime": "22:00",
    "endtime": "23:00",
    "title": "TDL定例会議" }) // query string
		  .end(function(err, res){
					console.log(err);
					console.log(res);


		  });
		return;
  }


  render() {
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
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					The actions in this window were passed in as an array of React objects.
					<form onSubmit={this.handleSubmit}>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHeaderColumn>スケジュール</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow >
								<TableRowColumn >20:00-21:00</TableRowColumn>
							</TableRow>
							<TableRow>
								<TableRowColumn>21:00-22:00</TableRowColumn>
							</TableRow>
							<TableRow>
								<TableRowColumn>22:00-23:00</TableRowColumn>
							</TableRow>
							<TableRow>
								<TableRowColumn>23:00-24:00</TableRowColumn>
							</TableRow>
						</TableBody>
						</Table>
						<FlatButton
							label="Cancel"
							primary={true}
							onTouchTap={this.handleClose}
						/>
						<FlatButton
							label="Submit"
							type="submit"
							primary={true}
							keyboardFocused={true}
							onTouchTap={this.handleClose}
						/>
					</form>
				</Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Facility;
