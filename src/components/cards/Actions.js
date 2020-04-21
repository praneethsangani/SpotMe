import React from 'react';
import Dislike from './actions/Dislike';
import Like from './actions/Like';
import Superlike from './actions/Superlike';

const Actions = ({ person, modifySuperficialChoices }) => (
  <div id="actions">
    <Dislike
      userId={person.id}
      modifySuperficialChoices={modifySuperficialChoices}
    />
    <Like
      userId={person.id}
      modifySuperficialChoices={modifySuperficialChoices}
    />
    <Superlike
      userId={person.id}
      modifySuperficialChoices={modifySuperficialChoices}
    />
  </div>
);

export default Actions;
