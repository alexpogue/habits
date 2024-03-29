import React, { useEffect, useState, useContext } from "react";
import Form from "../components/Form";
import { useParams, useNavigate } from "react-router-dom";
import { GoalContext } from "../context/GoalContext";
import HabitsApi from "../api/instance";
import GoalModal from "../components/GoalModal";

const Goal = () => {
  let navigate = useNavigate();

//  ---------State-----------
  const { id } = useParams();
  const { goals, setGoals } = useContext(GoalContext);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [formGoal, setFormGoal] = useState(null);

//  ---------Use Effect-----------
  useEffect(() => {
    if (goals) {
      setCurrentGoal(goals.find(goal => goal.id == id));
    } else {
      HabitsApi
        .getAllGoals()
        .then(allGoals => {
          setGoals(allGoals);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [goals]);

  useEffect(() => {
    if (formGoal) {
      HabitsApi
        .putGoal(formGoal, id)
        .then(updatedGoals => {
          setGoals(updatedGoals);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [formGoal]);

//  ---------Helper Methods-----------
  const handleFormSubmit = formData => {
    setFormGoal(formData);
  };

  const handleButtonClick = () => {
    HabitsApi.deleteGoal(currentGoal.id).then(updatedGoals => {
      setGoals(updatedGoals);
      navigate("/");
    });
  };

  const handleClose = () => {
    navigate("/");
  };

  const renderContent = () => {
    if (!currentGoal) {
      return;
    }
//  ---------Goal Component Return----------
    return (
      <div>
        <h3>Goal Name: {currentGoal.name}</h3>
        <h3>Goal Id: {currentGoal.id}</h3>
        <div>
          <GoalModal
            trigger={<button className="ui button yellow small" > Edit Goal</button> }
            header={`Delete Goal: ${currentGoal.name}`}
            descriptionText="Change the name of your goal within the goal list! No other details about your goal will change"
            actions={<Form buttonClass="ui button yellow small" buttonTitle="Accept Changes" placeholder="New goal name" onSubmit={handleFormSubmit}/>}
          />
          <GoalModal
            trigger={
              <button className="ui button red right floated ">
                Delete Goal
              </button>
            }
            header={`Delete Goal: ${currentGoal.name}`}
            descriptionHeader="Are you sure?"
            descriptionText="This action is permanent, there is no way to recover a goal once deleted."
            actions={
              <div>
                <button className="ui button red" onClick={handleButtonClick}>
                  Yes, delete this goal.
                </button>
                <button className="ui button" onClick={handleClose}>
                  No, take me back!
                </button>
              </div>
            }
          />
        </div>
      </div>
    );
  };
  return <div>{renderContent()}</div>;
};

export default Goal;
