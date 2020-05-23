import React, { useState, useEffect, useContext } from "react";
import {GoalContext} from "../context/GoalContext";
import GoalModal from "../components/GoalModal"
import HabitsApi from "../api/instance";
import Form from "../components/Form";
import {Link} from 'react-router-dom';
import history from "../history";
const Home = () => {

//  ---------State-----------

  const {goals, setGoals} = useContext(GoalContext);
  const [formGoal, setFormGoal] = useState(null);

//  ---------Use Effects-----------

  ///UseEffect condition [], invokes only once on initial render.
  useEffect(() => {
    if (goals) {
      return;
    }
    HabitsApi.getAllGoals()
      .then(allGoals => {
        setGoals(allGoals);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  //useEffect condition [formGoal], invokes whenever the formGoal state changes. 
  useEffect(() => {
    if (formGoal) {
      HabitsApi.postGoal(formGoal)
        .then(newGoalArray => {
          setGoals(newGoalArray);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [formGoal]);

  //  ---------Helper Methods-----------

  //Invokes setFormGoal with passed data.
  const handleFormSubmit = formData => {
    setFormGoal(formData);
  };

  //Conditionally rendering for Home.js
  const renderContent = () => {
    //Case A: If there is no state/no habits, return loading..
    if (!goals) {
      return <div>Loading...</div>;
    }
    //Case B: If there is state, map over the habit objects creating a habit
    // component for each.
    return goals.map(goal => (
      <li className="item" key={goal.id}>
        <Link to={`/goal/${goal.id}`}>{goal.name}</Link>
      </li>
    ));
  };

//  ---------Home Component Return-----------

  return (
    <div className="ui divided list">
      {renderContent()}
      <GoalModal 
        trigger={<button className="ui button green right floated">Add Goal</button>}
        header="Add a new goal."
        descriptionText="Add a new goal to your goal list!"
        actions={
          <Form buttonClass="ui button green" buttonTitle="Add" placeholder="Add Goal" onSubmit={handleFormSubmit} />
        }
      />
    </div>
  );
};

export default Home;
