import habit from "./instance";



export const getAllHabitGoals = async () => {
    const result = await habit("habit_goal/");
    return result.data.data;
};

export const getHabitGoal = async (data) => {
    const result = await habit("habit/goal/" + data);
    return result.data.data;
}

export const postHabitGoal = async (data) => {
    await habit.post("habit_goal/", {name: data});
    const newGoalArray =  await habit("habit_goal/");
    return newGoalArray.data.data;
}