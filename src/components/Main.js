import React from "react";
import Form from "./children/Form";
import Results from "./children/Results";
import SavedArticle from "./children/SavedArticle";


// Helper for making AJAX requests to our API
const helpers = require("./utils/helpers");
// import helpers from "../utils/helpers";

// Creating the Main component
class Main extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchBegindate: "", 
      searchEnddate:"", 
      results: [], 
      savedArticles: []
    };
    this.setTerm = this.setTerm.bind(this);
    this.getSavedArticles = this.getSavedArticles.bind(this);
    this.handleDeleteSavedArticle = this.handleDeleteSavedArticle.bind(this);
    this.removeResult = this.removeResult.bind(this);
  }

//Get the saved articles
  getSavedArticles() {

    helpers.getSaved().then(function(response) {
      console.log("These are current saved articles " + response);
      if (response !== this.state.savedArticles) {
        console.log("Saved articles", response.data);
        this.setState({ savedArticles: response.data });
      }
    }.bind(this));
  }

  handleDeleteSavedArticle(article) {
      helpers.deleteSaved(article._id).then(function(data) {
        this.getSavedArticles();
      }.bind(this));
  }

  componentDidUpdate() {
   if (this.state.searchTerm !== "") {
      const obj = {      
        term: this.state.searchTerm,
        begin_date: this.state.searchBegindate,
        end_date: this.state.searchEnddate
      };
    console.log("obj ", obj);
      // Run the query for the search criteria
      helpers.runQuery(obj).then(function(data) {
        if (data !== this.state.results) {
          console.log("Address xx ", data);
          this.setState({ results: data });
        } 
      }.bind(this));
      this.setState({searchTerm: ""});
   } 
  }

  removeResult(url) {
    let indexToRemove = -1
    for (let i = 0; i < this.state.results.length; i++) {
      if (this.state.results[i].url === url) {
        indexToRemove = i
      }
    }
    this.state.results.splice(indexToRemove, 1)
    this.setState({ results: this.state.results})
    this.getSavedArticles();
  }
  // This function allows children components to update the parent.
  setTerm(term, begin_date, end_date) {
    console.log("setTerm term ", term);
    this.setState({ searchTerm: term });

    console.log("setTerm begin_date ", begin_date);
    this.setState({ searchBegindate: begin_date });

    console.log("setTerm end_date ", end_date);
    this.setState({ searchEnddate: end_date });
  }

  // render the function
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center"><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h2>
          </div>
        </div>

        <div className="row">
          <Form setTerm={this.setTerm} />
        </div>

        <div className="row">
            <h5><strong>
              &nbsp;&nbsp;&nbsp;&nbsp;
              {this.state.results.length ? "Search Results" : "" }
            </strong></h5>   
        </div>
        
        <div className="row">
          {this.state.results.map(function(res, i) {
                return (
                  <Results removeResult={this.removeResult} articleInfo={res} key={i} />
                );
          }.bind(this))}
        </div>


        <div className="row">
          <div className="panel panel-default">
            <div className="panel-heading" id="savedHeader"><strong>Saved Article(s)</strong></div>
              <div className="panel-body">
              {this.state.savedArticles.map(function(res2, i) {
                return (
                  <div className="panel panel-default">
                    <div className="panel-body">
                      <SavedArticle handleDeleteSavedArticle={this.handleDeleteSavedArticle} savedArticleInfo={res2}  key={i + "b"}/>
                    </div>
                  </div>
                );
              }.bind(this))}
              </div>
            </div>
          </div>

      </div>
    );
  }
}

export default Main;