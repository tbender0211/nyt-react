import axios from "axios";


// The API stuff
const helper = {

  // Here we are querying the NYT API
  runQuery: function(articleSearch) {

    console.log("articleSearch", articleSearch);
    
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    queryURL += '?' + $.param({
      'api-key': "1b7b9b055b2a4d41b1c80802a98f266c",
      'q': articleSearch.term,
      'begin_date': articleSearch.begin_date + "0101",
      'end_date': articleSearch.end_date + "1231"
    });
    console.log("queryURL ", queryURL)
    return axios.get(queryURL).then(function(response) {
      // Get result, and return that result's formatted address property
      console.log("response ", response.data.response.docs)
      let fetchResult = [];
      if (response.data.response.docs[0]) {
        for (let article of response.data.response.docs) {
          let info = {};
          info["title"] = article.headline.main;
          info["pub_date"] = article.pub_date;
          info["url"] = article.web_url;
          info["snippet"] = article.snippet;
          info["art_id"] = article._id;
          fetchResult.push(info);
        }
      }
      return fetchResult;
    });
  },

  getSaved: function() {
    return axios.get("/api");
  },

  // Saves the searches to the DB
  postSaved: function(obj) {
    console.log("post saved object, ", obj);
    return axios.post("/api", {
      title: obj.title,
      snippet: obj.snippet,
      url: obj.url,
      pub_date: obj.pub_date,
      art_id: obj.art_id
    });
  },

  deleteSaved: function(id) {
      console.log("id helper ", id);
      return axios.post("/api/delete", {
          _id: id
      });
  },
};

module.exports = helper;