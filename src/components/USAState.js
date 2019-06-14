import React from "react";

const USAState = (props) => {
  return (
    <path d={props.dimensions}
      fill={props.fill}
      data-name={props.state}
      className={`${props.state} state ${props.active}`}
      onClick={props.onClickState}
      onMouseOver={(e) => props.active && props.onHover(e, props.stateName)}
      onMouseOut={() => props.active && props.onHoverOut()}
      onMouseMove={(e) => props.active && props.onMove(e)}
    >
      {/* <title>{props.stateName}</title> */}
    </path>
  );
}
export default USAState;
