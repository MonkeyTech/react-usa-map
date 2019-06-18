import React, { Fragment } from "react";
import PropTypes from "prop-types";
import data from "./data/usa-map-dimensions";
import USAState from "./components/USAState";

class USAMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toolTipPosition: { x: 0, y: 0},
      toolTipActive: false,
      toolTipcontent: null
    }
  }

  clickHandler = (stateAbbreviation) => {
    this.props.onClick(stateAbbreviation);
  };

  fillStateColor = (State) => {
    if (this.props.customize && this.props.customize[State] && this.props.customize[State].fill) {
      return this.props.customize[State].fill;
    }

    return this.props.defaultFill;
  };

  fillStateName = (State) => {
    if (this.props.customize && this.props.customize[State] && this.props.customize[State].title) {
      return this.props.customize[State].title;
    }

    return data[State].name;
  };

  isActive = (State) => {
    return !!(this.props.customize && this.props.customize[State]);
  }

  stateClickHandler = (State) => {
    if (this.props.customize && this.props.customize[State] && this.props.customize[State].clickHandler) {
      return this.props.customize[State].clickHandler
    }
    return this.clickHandler;
  }

  stateHoverHandler = (e, State) => {
    this.setState({ 
      toolTipcontent: State,
      toolTipActive: true
    });
  }

  stateHoverOutHandler = () => {
    this.setState({ toolTipActive: false });
  }

  stateMoveHandler = (e) => {
    this.setState({
      toolTipPosition: {
        x: e.clientX,
        y: e.clientY,
      }
    });
  }

  buildPaths = () => {
    let paths = [];
    for (let stateKey in data) {
      const path = <USAState key={stateKey} active={this.isActive(stateKey)} stateName={this.fillStateName(stateKey)} dimensions={data[stateKey]["dimensions"]} state={stateKey} fill={this.fillStateColor(stateKey)} onClickState={this.stateClickHandler(stateKey)} onHover={this.stateHoverHandler} onHoverOut={this.stateHoverOutHandler} onMove={this.stateMoveHandler} />
      paths.push(path);
    };
    return paths;
  };

  render() {
    return (
      <div>
        <svg className="us-state-map" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 959 593">
          <title>{this.props.title}</title>
          <g className="outlines">
            {this.buildPaths()}
            <g className="DC state">
              <path className="DC1" fill={this.fillStateColor("DC1")} d="M801.8,253.8 l-1.1-1.6 -1-0.8 1.1-1.6 2.2,1.5z" />
              <circle className="DC2" onClick={this.clickHandler} data-name={"DC"} fill={this.fillStateColor("DC2")} stroke="#FFFFFF" strokeWidth="1.5" cx="801.3" cy="251.8" r="5" opacity="1" />
            </g>
          </g>
        </svg>
        <div className={`map-tooltip ${this.state.toolTipActive && 'show'}`} style={{ left: this.state.toolTipPosition.x, top: this.state.toolTipPosition.y, display: this.state.toolTipActive }}>{this.state.toolTipcontent}</div>

      </div>
    );
  }
}

USAMap.propTypes = {
  onClick: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
  defaultFill: PropTypes.string,
  customize: PropTypes.object
};

USAMap.defaultProps = {
  onClick: () => { },
  // width: 959,
  // height: 593,
  defaultFill: "#D5D5D5",
  // title: "-",
  customize: {}
};

export default USAMap;
