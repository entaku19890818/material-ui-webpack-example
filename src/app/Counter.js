import React, { Component, PropTypes } from "react"
import IconButton from 'material-ui/IconButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AddIconButton from 'material-ui/svg-icons/content/add-circle';
import RemoveIconButton from 'material-ui/svg-icons/content/remove-circle';
import {blue500, red500} from 'material-ui/styles/colors';

const styles = {
  icon: {
    width: 48,
    height: 48
  },
  buttonSize: {
    width: 86,
    height: 86,
    padding: 24
  },
  countSize: {
    paddingLeft: 18
  }

};
class Counter extends Component {
  static PropTypes = {
    value: PropTypes.number.isRequired,
  }

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { value, actions } = this.props;
    return (
      <div>
        <h2 style={styles.countSize}>count={value}</h2>
        <IconButton tooltip="増加"
          iconStyle={styles.icon}
          style={styles.blockSize}>
          <AddIconButton color={red500}/>
        </IconButton>
        <IconButton tooltip="減少"
          iconStyle={styles.icon}
          style={styles.blockSize}>
          <RemoveIconButton color={blue500} />
        </IconButton>
      </div>
    )
  }
}

export default Counter;
