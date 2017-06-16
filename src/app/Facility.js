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
import RefreshIndicator from 'material-ui/RefreshIndicator';
import BookingTime from './BookingTime';
import moment from 'moment';


const dt = new Date();
const HOSTNAME = 'localhost';
const URL = 'http://' + HOSTNAME + ':3100/facility/'

var date = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();




const styles = {
	largeIcon: {
		width: 60,
		height: 60,
	},
	large: {
		width: 120,
		height: 120,
		padding: 30,
	},
	container: {
		position: 'relative',
	},
	refresh: {
		display: 'inline-block',
		position: 'relative',
	},
};

const tableData = [
	{
		"starttime": "06:00",
    "endtime": "07:00",
  },
	{
		"starttime": "07:00",
    "endtime": "08:00",
  },
  {
		"starttime": "08:00",
    "endtime": "09:00",
  },
  {
		"starttime": "09:00",
    "endtime": "10:00",
  },
  {
		"starttime": "10:00",
    "endtime": "11:00",
  },
  {
		"starttime": "11:00",
    "endtime": "12:00",
  },
  {
		"starttime": "12:00",
    "endtime": "13:00",
  },
  {
		"starttime": "13:00",
    "endtime": "14:00",
  },
  {
		"starttime": "14:00",
    "endtime": "15:00",
  },
	{
		"starttime": "15:00",
		"endtime": "16:00",
	},
	{
		"starttime": "16:00",
		"endtime": "17:00",
	},
	{
		"starttime": "17:00",
		"endtime": "18:00",
	},
	{
		"starttime": "18:00",
		"endtime": "19:00",
	},
	{
		"starttime": "19:00",
		"endtime": "20:00",
	},
	{
		"starttime": "20:00",
		"endtime": "21:00",
	},
];

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});




class Facility extends Component {
	bookingData = [];
	constructor(props) {
    super(props);
		var facilityId = props.facilityId;

		console.log(facilityId);
		request
			.get(URL + facilityId)
			.end((err, res) => {
				//レスポンスがJSONの場合
				this.bookingData = res.body.facility;
				console.log(this.bookingData);
			});

  }




	postData = {
		"desknetsId": 11,
		"startdate": date,
		"enddate": date,
		"starttime": "08:00",
		"endtime": "09:00",
		"title": "TDL定例会議",
		"start" : "",
		"end" : "",
		"facilityID": 1
	};

	state = {
    open: false,
		loading: 'hide',
		err_open: false,
		ok_open: false,
  };



	handleOpen = () => {
    this.setState({open: true});

  };

  handleClose = () => {
    this.setState({open: false});
		this.setState({err_open: false});
		this.setState({ok_open: false});
  };


	changeTime = (e) => {
		this.postData.starttime = tableData[e].starttime;
		this.postData.endtime = tableData[e].endtime;
		this.postData.start = this.postData.startdate.toString() + ' ' + this.postData.starttime;
		this.postData.end = this.postData.enddate.toString() + ' ' + this.postData.endtime ;

				console.log(this.postData);

	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({loading: 'loading'});
		request
		  .post(URL)
			.type('form')
		  .send(this.postData)
		  .end((err, res)　=> {
					console.log(err);
					console.log(res);
					if(res.body.status == 0){
						this.setState({ok_open: true});
					}else {
							this.setState({err_open: true});
						console.log("しね！");
					}

					this.setState({loading: 'hide'});
		  });

		return;
  }


  render() {

		const actions = [
			<FlatButton
				label="Close"
				primary={true}
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
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
					autoScrollBodyContent={true}
				>
					The actions in this window were passed in as an array of React objects.
					<form onSubmit={this.handleSubmit}>
					<Table onCellClick={this.changeTime}>
						<TableHeader>
							<TableRow>
								<TableHeaderColumn>開始時間</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody>

						{tableData.map( (row, index) => (
							<TableRow key={index}>
								<TableRowColumn>{row.starttime}</TableRowColumn>

								{this.bookingData.map((data) => {
									var starttime = moment(data.start).format("hh:mm");
									console.log(starttime);
									console.log(row.starttime);
									if ( starttime == row.starttime){
										console.log(starttime);
										return <TableRowColumn>{data.start}</TableRowColumn>;
									}
								})}
							</TableRow>
							))}

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
				<RefreshIndicator
					size={50}
					left={70}
					top={0}
					loadingColor="#FF9800"
					status={this.state.loading}
					style={styles.refresh}
				/>
			 <Dialog
				 modal={false}
				 actions={actions}
				 open={this.state.err_open}
				 onRequestClose={this.handleClose}
			 >
				 その設備はすでに予約済みです。。。
			 </Dialog>
			 <Dialog
				 modal={false}
				 actions={actions}
				 open={this.state.ok_open}
				 onRequestClose={this.handleClose}
			 >
				 予約完了しました！
			 </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}




export default Facility;
