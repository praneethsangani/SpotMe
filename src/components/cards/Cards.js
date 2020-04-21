import React, { Component , useState } from 'react';
import PropTypes from 'prop-types';
import Person from './Person';
import Lonely from './Lonely';
// import data from '../../data.json';

import '../../App.css';
import { connect } from 'react-redux';
import {getCards} from '../../redux/actions/userActions.js';

const Cards = () => {
  
    var data = getCards();
    console.log(data);
    const [people, setPeople] = useState(data);
    const [likedUsers, setLikedUsers] = useState([]);
    // const [superLikedUsers, setSuperLikedUsers] = useState([]);
    const [dislikedUsers, setDislikedUsers] = useState([]);
    const activeUser = 0;
  
    const removedPersonFromDataSrc = (peopleSource, userId) =>
      peopleSource.filter(user => user.id !== userId);
  
    const modifySuperficialChoices = (userId, action) => {
      const newPeople = [...people];
      const newLikedUsers = [...likedUsers];
      // const newSuperLikedUsers = [...superLikedUsers];
      const newDislikedUsers = [...dislikedUsers];
  
      switch (action) {
        case 'ADD_TO_LIKED_USERS':
          if (!people[activeUser].likedUsers.includes(userId)) {
            newPeople[activeUser].likedUsers.push(userId);
            newLikedUsers.push(data[userId]);
  
            setLikedUsers(newLikedUsers);
            setPeople(removedPersonFromDataSrc(people, userId));
          }
          break;
        case 'ADD_TO_DISLIKED_USERS':
          if (!people[activeUser].dislikedUsers.includes(userId)) {
            newPeople[activeUser].dislikedUsers.push(userId);
            newDislikedUsers.push(data[userId]);
  
            setDislikedUsers(newLikedUsers);
            setPeople(removedPersonFromDataSrc(people, userId));
          }
          break;
        // case 'ADD_TO_SUPERLIKED_USERS':
        //   if (!people[activeUser].superLikedUsers.includes(userId)) {
        //     newPeople[activeUser].superLikedUsers.push(userId);
        //     newSuperLikedUsers.push(data[userId]);
  
        //     setSuperLikedUsers(newSuperLikedUsers);
        //     setPeople(removedPersonFromDataSrc(people, userId));
        //   }
        //   break;
        default:
          return people;
      }
    };
  
  
    return (
        
        <div className="cards" >
            
            {people[1] ? (
            <Person
              key={people[1].id}
              person={people[1]}
              modifySuperficialChoices={modifySuperficialChoices}
              likedUsers={likedUsers}
            />
          ) : (
            <Lonely
              activeUserImage={people[activeUser].image}
              likedUsers={likedUsers}
              // superLikedUsers={superLikedUsers}
            />
          )}
          
        </div>
    
    );
  }

  const mapStateToProps = (state) => ({
    data: state.data
  });
  
  const mapActionsToProps = {getCards};
  
  Cards.propTypes = {
    getCards: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };

  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(Cards);