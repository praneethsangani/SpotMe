import React from 'react';
import {likeUser} from '../../../redux/actions/userActions.js';
const Like = ({ userId, like, modifySuperficialChoices }) => (
  <button
    type="button"
    onClick={like()}
  >
    <img src="images/misc/like.png" alt="Like User" />
  </button>
);

export default Like;
