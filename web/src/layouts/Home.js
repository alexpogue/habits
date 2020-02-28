import React, { useState, useEffect } from "react";
import { getAllHabitGoals, postHabitGoal } from "../api/habitAPI/goalApiGet";
import Form from "../components/Form";

const Home = () => {
  const [habits, setHabits] = useState(null);

  ///UseEffect condition [], invokes only once on initial render.
  useEffect(() => {
    if (habits) {
      return;
    }
    getAllHabitGoals()
      .then(values => {
        setHabits(values);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  //useEffect condition [formGoal], invokes whenever the formGoal state changes. 
  const [formGoal, setFormGoal] = useState(null);
  useEffect(() => {
    if (formGoal) {
      postHabitGoal(formGoal)
        .then(newGoalArray => {
          setHabits(newGoalArray);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [formGoal]);

  //Helper function that invokes setFormGoal with passed data.
  const handleFormSubmit = formData => {
    setFormGoal(formData);
  };

  //Helper function for conditionally rendering Home.js
  const renderContent = () => {
    //Case A: If there is no state/no habits, return loading..
    if (!habits) {
      return <div>Loading...</div>;
    }
    //Case B: If there is state, map over the habit objects creating a habit
    // component for each.
    return habits.map(habit => (
      <li className="item" key={habit.id}>
        <a href={"/goal/" + habit.id}>{habit.name}</a>
      </li>
    ));
  };
  // The Home.js return statement, which renders the renderContent helper
  return (
    <div className="ui divided list">
      {renderContent()}
      <Form onSubmit={handleFormSubmit} />
    </div>
  );
};

export default Home;
