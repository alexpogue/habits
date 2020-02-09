import React, {useState, useEffect} from 'react';
import {getHabitGoals}  from "../api/habitAPI/habitApiGET";


const Home = () => {
    const [habits, setHabits] = useState(null);
 
    useEffect(() => {
        if(habits) {
            return; 
        }
    // Step 1: Utilize axios to fetch habit-goals from the api 
    // Step 2: fetched data set to the local state using useState hook
    // Currently I am getting an empty return from the API due to CORS preflight. 
      getHabitGoals().then(setHabits)

    }, [habits]);
    console.log(habits);
    // Step 3: Return statement that has two cases
    // Step 3 - Case A: There is no state, return loading..
    // Step 3 - Case B: If there is state, map over the habit objects creating a habit
    // component for each. 
    return (
        <div>
            <p>Coming from home!</p>

        </div>
    );
}

export default Home;
