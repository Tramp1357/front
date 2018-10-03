import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {Link} from 'react-router-dom';

export default class UiLink extends Component {

  static propTypes = {
    // prop: PropTypes
  }


  getUrl(){
    return "javascript:;";
  }


  render() {

    const {
      ...other
    } = this.props;

    const url = this.getUrl();

    return (
      <Link
        to={url}
        href={url}
        // activeClassName="fdgdgfd"
        {...other}
      />
    )
  }
}
