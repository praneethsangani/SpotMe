import React from 'react';
import Dislike from './actions/Dislike';
import Like from './actions/Like';

const Actions = ({ person, modifySuperficialChoices, like, dislike}) => (
  <div id="actions">
    <Dislike
      dislike={dislike}
      userId={person.id}
      modifySuperficialChoices={modifySuperficialChoices}
    />
    <Like
      userId={person.id}
      like={like}
      modifySuperficialChoices={modifySuperficialChoices}
    />
  </div>
);

export default Actions;
