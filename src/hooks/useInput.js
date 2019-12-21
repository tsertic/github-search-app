import { useState } from 'react';

const useInput = (initialValue = '') => {
  const [state, setState] = useState(initialValue);

  const handleChange = e => {
    setState(e.target.value);
  };
  const resetState = () => {
    setState(initialValue);
  };

  return [state, handleChange, resetState];
};

export default useInput;
