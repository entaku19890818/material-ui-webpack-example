import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main'; // Our custom react component
import Facility from './Facility';
import Human from './Human';
//import Card from './Card';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
//render(<Main />, document.getElementById('app'));
render(<Facility facilityId='2' />, document.getElementById('kawano'));
render(<Facility facilityId='1' />, document.getElementById('luke'));
//render(<Human />, document.getElementById('human'));

//render(<Card />, document.getElementById('card'));
