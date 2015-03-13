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
    getInitialState: function() {
      return { data: [] }
    },

    componentDidMount: function() {
    },

    render: function() {
      return(
        <div className="row">
          <ChatHistory url={this.props.url + "/history.json"}
                       onChange={this.handleChange}/>
          <Summary data={this.state.data} />
        </div>
      );
    },

    handleChange: function(event) {
      this.loadSummary(event.currentTarget.value);
    },

    loadSummary: function(text) {
      console.log("load summary");

      $.ajax({
        url: (this.props.url + "/summary").toString(),
        method: 'POST',
        data: { data: text },
      }).done(function(data, status, jqxhr) {
        
        this.setState(data);

      }.bind(this)).fail(function(jqxhr, status, err) {

        console.error(this.props.url, status, err.toString());

      }.bind(this))
    },
  })

  ChatHistory = React.createClass({
    componentDidMount: function() {
      //this.loadChatHistory();
      //setInterval(this.loadChatHistory, 2000);
    },

    render: function() {
      console.log("render history");
      return(
        <div className="col-md-6">
          <textarea ref="chat" style={{ width: "100%" }} rows="20"
            onChange={this.props.onChange} />
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

  })

  Summary = React.createClass({
    render: function() {
      console.log(this.props.data)
      var sentences = this.props.data.map(function(sentence_data) {
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
