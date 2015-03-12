// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/
//
//ChatRoom = React.createClass({
//  render: () ->
//
//})

$(function() {

  Room = React.createClass({
    componentDidMount: function() {

    },

    render: function() {
      return(
        <div className="row">
          <ChatHistory url={this.props.url + "/history.json"} />
          <Summary url={this.props.url + "/summary.json"} />
        </div>
      );
    },
  })

  ChatHistory = React.createClass({
    getInitialState: function() {
      return { data: "loading..." }
    },

    componentDidMount: function() {
      //this.loadChatHistory();
      //setInterval(this.loadChatHistory, 2000);
    },

    render: function() {
      console.log("render history");
      return(
        <div className="col-md-6">
          <textarea style={{ width: "100%" }} rows="20"
            value={this.state.data}
            onChange={this.handleChange} />
        </div>
      )
    },

    loadChatHistory: function() {
      console.log("load history");
      $.ajax({
        url: this.props.url,
        dataType: 'json',
      }).done(function(data, status, jqxhr) {

        this.setState(data);

      }.bind(this)).fail(function(jqxhr, status, err) {

        console.error(this.props.url, status, err.toString());

      }.bind(this))
    },

    handleChange: function(event) {
      this.setState({ value: event.target.value })

    },

  })

  Summary = React.createClass({
    getInitialState: function() {
      return { data: [ { sentence: "summarizing...", score: 100 } ] }
    },

    componentDidMount: function() {
      this.loadSummary();
    },

    loadSummary: function() {
      console.log("load summary");

      $.ajax({
        url: this.props.url,
        dataType: 'json',
      }).done(function(data, status, jqxhr) {
        
        this.setState(data);

      }.bind(this)).fail(function(jqxhr, status, err) {

        console.error(this.props.url, status, err.toString());

      }.bind(this))
    },

    render: function() {
      console.log(this.state.data)
      var sentences = this.state.data.map(function(sentence_data) {
        return (
          <p className="sentence" score={sentence_data['score']}>
            {sentence_data['sentence']}
          </p>
        );
      })

      return (
        <div className="col-md-6">
          <div id="summary">
            {sentences}      
          </div>
        </div>
      );
    }
  });

  React.render(
    <Room url="/rooms/1"/>,
    document.getElementById('room')
  );

})
