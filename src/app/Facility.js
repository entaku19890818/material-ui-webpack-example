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
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import request from 'superagent';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import BookingTime from './BookingTime';
import moment from 'moment-timezone';


const dt = new Date();
const HOSTNAME = 'localhost';
const URL = 'http://' + HOSTNAME + ':3100/facility/'

var date = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();




let styles = {
	largeIcon: {
		width: 60,
		height: 60,
	},
	large: {
		width: 120,
		height: 120,
		padding: 30,
	},
	middleIcon: {
		width: 40,
		height: 40,
	},
	middle: {
		width: 80,
		height: 80,
		padding: 20,
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


	getBooking = (facilityId ,date) => {
		console.log(facilityId);
		request
			.get(URL + facilityId + '/' + date + '/' + moment(date).add(1,"days").format("YYYY-MM-DD"))
			.end((err, res) => {
				//レスポンスがJSONの場合
				this.bookingData = res.body.facility;
				console.log(this.bookingData);
			});
  };

	getBookingNow = (facilityId ,datetime) => {
		console.log(facilityId);
		request
			.get(URL + facilityId + '/' + datetime)
			.end((err, res) => {
				//レスポンスがJSONの場合
				this.bookingDataNow = res.body.facility;
						//現在時刻に予約があれば色を変える
				if(this.bookingDataNow.length > 0 ){
					this.state.Facility.iconStyle.color = '#E91E63';
				}
				console.log(this.state);
			});
  };

	constructor(props) {
    super(props);
		//親から機器IDをもらう
		var facilityId = props.facilityId;
		//予約情報を初期化
		this.bookingData = [];
		this.bookingDataNow = [];
		this.postData.facilityID = facilityId

		this.getBooking(facilityId,date);

		this.getBookingNow(facilityId,moment().format());



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
		"facilityID":''
	};

	state = {
		date: date,
    open: false,
		loading: 'hide',
		err_open: false,
		ok_open: false,
		Facility:{
			iconStyle: styles.largeIcon
		}
  };


	nextDays = () => {
    this.postData.startdate = moment(this.postData.startdate).add(1,"days").format("YYYY-MM-DD");
		this.postData.enddate = moment(this.postData.enddate).add(1,"days").format("YYYY-MM-DD");
		this.setState({date: this.postData.startdate});
		this.getBooking(this.postData.facilityID,this.postData.startdate);
  };
	prevDays = () => {
		this.postData.startdate = moment(this.postData.startdate).add(-1,"days").format("YYYY-MM-DD");
		this.postData.enddate = moment(this.postData.enddate) .add(-1,"days").format("YYYY-MM-DD");

		this.setState({date: this.postData.startdate});
		this.getBooking(this.postData.facilityID,this.postData.startdate);
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
					iconStyle={this.state.Facility.iconStyle}
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
					<IconButton
						iconStyle={styles.middleIcon}
						style={styles.middle}
						touch={true}
						onTouchTap={this.prevDays}
						>
						<ChevronLeft />
					</IconButton>
					<IconButton
						iconStyle={styles.middleIcon}
						style={styles.middle}
						touch={true}
						onTouchTap={this.nextDays}
						>
						<ChevronRight />
					</IconButton>
					現在の日付:{this.state.date}
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
									var starttime = moment(data.start).tz('Asia/Tokyo').format("HH:mm");
									console.log(starttime);
									console.log(row.starttime);
									if ( starttime == row.starttime){

										return <TableRowColumn>{data.title}</TableRowColumn>;
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
