/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Image } from 'material-ui-image'



// ...
const styles = {
 width: 300, height: 450
};

class Human extends Component {
	render() {
	  return (
			<MuiThemeProvider >
	    <div >
	      <Image
	        src="/img/tanaka.jpg"
					style={styles}
	      />
	    </div>
			</MuiThemeProvider>
	  )
	}
}

export default Human;
