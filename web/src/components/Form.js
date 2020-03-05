import React, { useState } from "react";
import styled from "styled-components";

const Form = props => {

  //  ---------State-----------

  const [fieldInfo, setFieldInfo] = useState(null);

  //  ---------Helper Methods-----------

  //Callback responsible for rendering inputted form text back to the user.
  const handleChange = e => {
    setFieldInfo(e.target.value);
  };

  //Callback is invoked with formData, and passes it to the parent via the parents onSubmit callback.
  const handleSubmit = e => {
    props.onSubmit(fieldInfo);
    e.preventDefault();
  };

//  ---------Form Return-----------

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        placeholder={props.placeholder}
        value={fieldInfo}
      />
      <button className={props.buttonClass} type="submit">
        {props.buttonTitle}
      </button>
    </form>
  );
};

export default Form;
