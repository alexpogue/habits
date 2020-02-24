import React, { useState, useEffect } from "react";
import { getAllHabitGoals, postHabitGoal } from "../api/habitAPI/habitApiGET";
import Form from "../components/Form";

const Home = () => {
  const [habits, setHabits] = useState(null);

  useEffect(() => {
    if (habits) {
      return;
    }
    //Utilize axios to fetch habit-goals from the api
    //Fetch habit data and then set to the local state using useState hook
    getAllHabitGoals()
      .then(values => {
        setHabits(values);
      })
      .catch(err => {
        console.log(err);
      });
    //Compare to the current habits state, if there is no difference end.
  }, []);

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

  const handleFormSubmit = formData => {
    setFormGoal(formData);
  };

  //Helper function for conditionally rendered Home.js
  const renderContent = () => {
    //Case A: If there is no state, return loading..
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
