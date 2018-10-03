import React, {Component} from 'react';

var Immutable = require('immutable');

import Draft from 'draft-js';
var {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState, convertFromHTML, SelectionState, Modifier} = Draft;

import "./styles/styles.less";

const defaultProps = {
  placeholder: "",
  name: "",
}

export default class Field extends Component{

  constructor(props){

    super(props);

    let editorState = this.initEditState(props.value);


    this.state = {
      editorState: editorState,
    };

    this._onChange = function(editorState){
      this.props.onChange(this.props.name, editorState);
      this.setState({editorState});
    }.bind(this);
  }

  initEditState(content){
    var editorState;

    var state = null;


    if(content && content.blocks){
      state = convertFromRaw(content);
    }
    else if(content && typeof content == "string"){
      var blocks = convertFromHTML(content);
      state = ContentState.createFromBlockArray(blocks);
    }

    if(state){
      editorState = EditorState.createWithContent(state);
    }
    else{
      editorState = EditorState.createEmpty();
    }

    return editorState;
  }

  componentWillReceiveProps(nextProps){


    if(
      (nextProps.item_id != this.state.item_id)
      ||
      (nextProps.hash && nextProps.hash != this.state.hash)
    ){

      this.state.hash = nextProps.hash;
      this.state.item_id = nextProps.item_id;

      var EditorState = this.initEditState(nextProps.value);

      this._onChange(EditorState);
    }

    return true;
  }

  getValue(){

  }

  render(){

    if(typeof window == "undefined"){
      return null;
    }

    let {editorState} = this.state;

    var className = "draft-editor field";

    if(!this.props.readOnly){
      className += " editable";
    }

    return <div
        className={className}
      >
        <Editor
          editorState={editorState}
          placeholder={this.props.readOnly ? "" : this.props.placeholder}
          onChange={this._onChange}
          readOnly={this.props.readOnly}
        />
    </div>;
  }
}

Field.defaultProps = defaultProps;
