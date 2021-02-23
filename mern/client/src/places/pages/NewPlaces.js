import React, { useCallback, useReducer } from "react";
import "./PlaceForm.css";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import Card from "../../shared/components/UIElements/Card/Card";
import Button from "../../shared/components/FormElements/Button";
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
      return state;
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
      address: {
        value: "",
        isValid: false,
      },
    },
    //all inputs validity
    isValid: false,
  });
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      InputId: id,
      value: value,
      isValid: isValid,
    });
  }, []);
  const placeSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs); //send this to the backend
  };
  return (
    <form className="place-form">
      <Card className="place-form col-lg-6 offset">
        <Input
          id="title"
          label="Title"
          type="text"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <Input
          id="description"
          label="Description"
          type="text"
          element="textarea"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          label="Address"
          type="text"
          element="input"
          validators={[VALIDATOR_REQUIRE(5)]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add
        </Button>
      </Card>
    </form>
  );
};

export default NewPlaces;
