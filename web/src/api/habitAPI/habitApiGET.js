import habit from "./instance";



export const getAllHabitGoals = async () => {
    const result = await habit("goal/");
    return result.data.data;
};

export const getHabitGoal = async (data) => {
    const result = await habit("goal/" + data);
    return result.data.data;
}

export const postHabitGoal = async (data) => {
    await habit.post("goal/", {name: data});
    const newGoalArray =  await habit("goal/");
    return newGoalArray.data.data;
}