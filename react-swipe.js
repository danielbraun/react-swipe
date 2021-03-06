
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(
      require('react/addons'),
      require('swipe-js-iso')
    );
  } else {
    root.ReactSwipe = factory(
      root.React,
      root.Swipe
    );
  }
})(this, function (React, Swipe) {
  var styles = {
    container: {
      overflow: 'hidden',
      visibility: 'hidden',
      position: 'relative'
    },

    wrapper: {
      overflow: 'hidden',
      position: 'relative'
    },

    child: {
      float: 'left',
      width: '100%',
      position: 'relative'
    }
  };

  var ReactSwipe = React.createClass({
    // https://github.com/thebird/Swipe#config-options
    propTypes: {
      startSlide      : React.PropTypes.number,
      slideToIndex    : React.PropTypes.number,
      shouldUpdate    : React.PropTypes.func,
      speed           : React.PropTypes.number,
      auto            : React.PropTypes.number,
      continuous      : React.PropTypes.bool,
      disableScroll   : React.PropTypes.bool,
      stopPropagation : React.PropTypes.bool,
      callback        : React.PropTypes.func,
      transitionEnd   : React.PropTypes.func
    },

    componentDidMount: function () {
        this.addSwipe();
    },

    componentDidUpdate: function () {
        this.removeSwipe();
        this.addSwipe();
    },

    componentWillUnmount: function () {
        this.removeSwipe();
    },
    removeSwipe: function() {
        this.swipe.kill();
        delete this.swipe;
    },
    addSwipe: function() {
        this.swipe = Swipe(this.getDOMNode(), this.props);
    },
    render: function() {
      return React.createElement('div', React.__spread({}, this.props, {style: styles.container}),
        React.createElement('div', {style: styles.wrapper},
          React.Children.map(this.props.children, function (child) {
            return React.addons.cloneWithProps(child, {style: styles.child});
          })
        )
      );
    }
  });

  return ReactSwipe;
});
