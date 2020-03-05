import goal from "./instance";

// Gets all goals from the goal api.
export const getAllGoals = async () => {
  const result = await goal("goal/");
  return result.data.data;
};

// Gets a goal with matching goalId if invoked with a goalId.
export const getGoal = async goalId => {
  const result = await goal(`goal/${goalId}`);
  return result.data.data;
};

// Posts a single goal to the goalAPI, returns with the new goal array.
export const postGoal = async name => {
  await goal.post("goal/", { name: name });
  const newGoalArray = await goal("goal/");
  return newGoalArray.data.data;
};

export const putGoal = async (newName, id) => {
  await goal.put(`goal/${id}`, { name: newName });
  const newGoalArray = await goal("goal/");
  return newGoalArray.data.data;
};

export const deleteGoal = async (id) => {
  await goal.delete(`goal/${id}`);
  const newGoalArray = await goal("goal/");
  return newGoalArray.data.data;
};