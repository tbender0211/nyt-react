import React from "react";
const helpers = require("./utils/helpers");

// Shows recent searches
class Saved extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      result: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    event.preventDefault();
    this.props.handleDeleteSavedArticle(this.props.savedArticleInfo);
  }

  render() {
    return (  
      <div>
        <a target="_blank" href={this.props.savedArticleInfo.url}>{this.props.savedArticleInfo.title}</a>
        &nbsp;•&nbsp;Saved Date {this.props.savedArticleInfo.date.substring(0,10)}
        <button onClick={this.handleDelete} className="btn btn-default btn-xs pull-right">Delete</button>
      </div>
    );
  }
}

export default Saved;