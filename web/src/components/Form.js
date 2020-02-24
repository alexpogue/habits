import React, {useState} from 'react';


const Form = props => {
  //
  const [fieldInfo, setFieldInfo] = useState([]);


  // the handleChange callback responsible for rendering inputted form text back to the user.
  const handleChange = e => {
    setFieldInfo(e.target.value);
  };

  // the handleSubmit callback is invoked with formData, and passes it to the parent via the parents onSubmit callback.
  const handleSubmit = e => {
    props.onSubmit(fieldInfo);
    e.preventDefault();
  };

  return (
    <form onSubmit = {handleSubmit}>
        <input onChange={handleChange} placeholder="Input Goal" value={fieldInfo}></input>
        <button type="submit">Submit</button>
      </form>
  );
}

export default Form;