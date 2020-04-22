import React from 'react';

const Dislike = ({ userId, dislike }) => (
  <button
    type="button"
    onClick={dislike()}
  >
    <img src="images/misc/dislike.png" alt="Dislike User" />
  </button>
);

export default Dislike;
