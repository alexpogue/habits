import habit from "./instance";


export const getHabitGoals = async () => {
    const result = await habit("habit_goal/");
    return result;
};

