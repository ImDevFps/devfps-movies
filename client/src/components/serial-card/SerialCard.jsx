import React from "react";
import { withRouter } from "react-router";

const SerialCard = ({ serial, history }) => {
  return (
    <div className='movie-card'>
      <span onClick={() => history.push(`/browse/serials/${serial.routeName}`)}>
        <img src={serial.poster} alt='item' />
      </span>
    </div>
  );
};

export default withRouter(SerialCard);
