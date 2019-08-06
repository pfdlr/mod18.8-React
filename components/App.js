App = React.createClass({
  getInitialState() {
    return {
      loading: false,
      searchingText: "",
      gif: {}
    };
  },

  handleSearch: function(searchingText) {
    // pobiera text
    this.setState({
      loading: true // jeśli true wyświetli anim. gif GIPHY_LOADING_URL
    });
    this.getGif(
      searchingText,
      function(gif) {
        this.setState({
          // ustawia state
          loading: false, // false ustawi url do gifa this.props.url
          gif: gif, //obiekt gif do state.gif
          searchingText: searchingText
        });
      }.bind(this)
    ); //zapobiega utracie kontekstu this
  },
  getGif: function(searchingText, callback) {
    var GIPHY_API_URL = "https://api.giphy.com";
    var GIPHY_PUB_KEY = "X3RzoSBbIzfv4uGlRq59llA9l4XwMMJr";
    var url =
      GIPHY_API_URL +
      "/v1/gifs/random?api_key=" +
      GIPHY_PUB_KEY +
      "&tag=" +
      searchingText;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText).data;
        var gif = {
          // tworzymu obiekt z elementami ponizej
          url: data.fixed_width_downsampled_url,
          sourceUrl: data.url
        };
        callback(gif); // ?????????????
      }
    };
    xhr.send();
  },
  render: function() {
    var styles = {
      margin: "0 auto",
      textAlign: "center",
      width: "90%"
    };

    return (
      <div style={styles}>
        <h1>Wyszukiwarka GIFow!</h1>
        <p>
          Znajdź gifa na <a href="http://giphy.com">giphy</a>. Naciskaj enter,
          aby pobrać kolejne gify.
        </p>
        <Search onSearch={this.handleSearch} />
        <Gif
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
          /* ustawia propsy: loading, url, sourceUrl ( >> Gif.js) */
        />
        <p> 'Powered by GIPHY' </p>
      </div>
    );
  }
});
