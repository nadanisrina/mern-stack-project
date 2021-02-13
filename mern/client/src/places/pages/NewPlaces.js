import React, { useCallback, useReducer } from "react";
import "./NewPlaces.css";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import Card from "../../shared/components/UIElements/Card/Card";
const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
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
      break;
  }
};
const NewPlaces = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });
  const inputHandler = useCallback(
    (id, value, isValid) => {
      dispatch({
        type: "INPUT_CHANGE",
        InputId: id,
        value: value,
        isValid: isValid,
      });
    },
    [dispatch]
  );
  return (
    <form>
      <Card className="col-lg-6 offset">
        <Input
          id="title"
          type="text"
          label="Title"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <Input
          id="description"
          type="description"
          label="Description"
          element="textarea"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
      </Card>
    </form>
  );
};

export default NewPlaces;
