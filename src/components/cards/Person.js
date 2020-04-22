import React from 'react';
import Actions from './Actions';

const Person = ({ person, like, dislike }) => {
  const { name, bio, imageUrl, gym } = person;
  return (
    <>
      <div className="person">
        <div className="person-photo">
          <img src={`${imageUrl}`} alt={name} />
        </div>

        <div className="person-description">
          <p className="person-name-age">
            {name}, Gym: <span>{gym}</span>
          </p>
          <p className="person-info">{bio}</p>
        </div>
      </div>

      <Actions
        person={person}
        like={like}
        dislike={dislike}
      />
    </>
  );
};

export default Person;
