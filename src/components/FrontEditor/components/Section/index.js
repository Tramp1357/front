import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditorComponent from '..';

import Icon from "material-ui-icons/SettingsOverscan";

class Section extends EditorComponent {

  static defaultProps = {
    ...EditorComponent.defaultProps,
    marginTop: 10,
    marginBottom: 10,
  }

  renderPanelView() {

    const {
      classes,
    } = this.context;

    return super.renderPanelView(<div
      className={classes.panelButton}
    >
      <Icon /> Section
    </div>);
  }

  renderMainView() {

    const {
      marginTop,
      marginBottom,
    } = this.getComponentProps(this);

    const {
      style,
      ...other
    } = this.getRenderProps();

    return <div
      style={{
        ...style,
        marginTop,
        marginBottom,
      }}
      {...other}
    >
      {super.renderMainView()}
    </div>;
  }

}

export default Section;
