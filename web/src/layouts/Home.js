import React, { useState, useEffect } from "react";
import { getHabitGoals } from "../api/habitAPI/habitApiGET";

const Home = () => {
  const [habits, setHabits] = useState(null);

  useEffect(() => {
    if (habits) {
      return;
    }
    // Step 1: Utilize axios to fetch habit-goals from the api
    // Step 2: fetched data set to the local state using useState hook
    getHabitGoals().then(setHabits);
  }, [habits]);

  // Step 3: Helper function for conditionally rendered Home.js
  const renderContent = () => {
    // Step 3 - Case A: If there is no state, return loading..
    if (!habits) {
      return <div>Loading...</div>;
    }
    // Step 3 - Case B: If there is state, map over the habit objects creating a habit
    // component for each.
    return habits.map(habit => (
      <li class="item" key={habit.id}>
        {habit.name}
      </li>
    ));
  }
  // The Home.js return statement, which renders the renderContent helper
  return <div className="ui divided list">{renderContent()}</div>;
};

export default Home;
