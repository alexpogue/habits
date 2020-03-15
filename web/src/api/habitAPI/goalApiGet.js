import habit from "./instance";

// Gets all goals from the goal api.
export const getAllHabitGoals = async () => {
  const result = await habit.get("goal/");
  return result.data.data;
};

// Gets a goal with matching goalId if invoked with a goalId.
export const getHabitGoal = async goalId => {
  const result = await habit.get("goal/" + goalId);
  return result.data.data;
};

// Posts a single goal to the goalAPI, returns with the new goal array.
export const postHabitGoal = async data => {
  await habit.post("goal/", { name: data });
  const newGoalArray = await habit("goal/");
  return newGoalArray.data.data;
};
