
import React from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

// import {
//   usersConnection,
// } from '../../query';

import View from './View';

import Page from '../layout';
import gql from 'graphql-tag';


const propTypes = Object.assign({ ...Page.propTypes }, {
  View: PropTypes.func.isRequired,
});


const defaultProps = Object.assign({ ...Page.defaultProps }, {
  View,
  first: 10,
  orderBy: "username_ASC",
});


export default class UsersPage extends Page {

  static propTypes = propTypes

  static defaultProps = defaultProps


  constructor(props) {

    super(props);

    this.state = {}
  }


  setPageMeta(meta) {

    return super.setPageMeta(meta || {
      title: "Users",
    });

  }


  addObject(event) {

    const {
      history,
    } = this.props;

    history.push(`/users/create/`);

  }


  componentWillMount() {

    const {
      View,
    } = this.props;

    // return;

    const {
      Renderer,
    } = this.state;

    if (!Renderer) {

      const {
        query: {
          usersConnection,
        },
      } = this.context;

      const Renderer = compose(
        graphql( gql(usersConnection), {
          // name: 'items', 
        }),

      )(View);

      Object.assign(this.state, {
        Renderer,
      });

    }

    super.componentWillMount && super.componentWillMount();

  }


  render() {

    const {
      View,
      first: limit,
      data,
      ...other
    } = this.props;


    const {
      Renderer,
    } = this.state;

    const {
      uri,
    } = this.context;


    let {
      page,
    } = uri.query(true);


    page = parseInt(page) || 0;

    const skip = page ? (page - 1) * limit : 0;


    return super.render(<Renderer
      // addObject={event => {
      //   this.addObject(event);
      // }}
      page={page}
      skip={skip}
      first={limit}
      limit={limit}
      data={data}
      {...other}
    />)

  }

}




