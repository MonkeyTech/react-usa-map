(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react);
    global.USAState = mod.exports;
  }
})(this, function (exports, _react) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var USAState = function USAState(props) {
    return _react2.default.createElement("path", { d: props.dimensions,
      fill: props.fill,
      "data-name": props.state,
      className: props.state + " state " + props.active,
      onClick: props.onClickState,
      onMouseOver: function onMouseOver(e) {
        return props.active && props.onHover(e, props.stateName);
      },
      onMouseOut: function onMouseOut() {
        return props.active && props.onHoverOut();
      },
      onMouseMove: function onMouseMove(e) {
        return props.active && props.onMove(e);
      }
    });
  };
  exports.default = USAState;
});