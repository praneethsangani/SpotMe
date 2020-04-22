import React from 'react';
import LikedPerson from './LikedPerson';

const Lonely = ({ activeUserImage, likedUsers }) => (
  <div id="lonely">
    <p>There's no new around you.</p>

    <span className="pulse">
      {/* <img src={`/../../images/icon.png`} alt="No one" /> */}
    </span>
  </div>
);

export default Lonely;
