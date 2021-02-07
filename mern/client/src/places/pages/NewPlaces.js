import React from "react";
import "./NewPlaces.css";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card/Card";

const NewPlaces = () => {
  return (
    <form>
      <Card className="col-lg-6 offset">
        <Input
          type="text"
          label="Title"
          element="input"
          validators={[]}
          errorText="Please enter a valid title"
        />
      </Card>
    </form>
  );
};

export default NewPlaces;
