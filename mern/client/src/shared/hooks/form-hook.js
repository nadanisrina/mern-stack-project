import React, { useCallback, useReducer } from "react";
const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      console.log("inputId", inputId);
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.InputId]: {
            value: action.value,
            isValid: action.isValid,
          },
          isValid: formIsValid,
        },
      };
      break;

    default:
      return state;
  }
};
export const useForm = (initialInputs, initialValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    //all inputs validity
    isValid: initialValidity,
  });
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      InputId: id,
      value: value,
      isValid: isValid,
    });
  }, []);

  return [formState, inputHandler];
};
