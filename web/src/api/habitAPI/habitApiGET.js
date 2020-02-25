import habit from "./instance";


export const getHabitGoals = async () => {
    const result = await habit("goal/");
    return result.data.data;
};

