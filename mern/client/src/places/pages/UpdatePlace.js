import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

const DUMMY_PLACES = [
  {
    id: "p1",
    imgUrl:
      "https://lh5.googleusercontent.com/p/AF1QipPqGkkLoB6iHeXCUgOs6O5EtSno5UKnE0_goWxD=w408-h327-k-no",
    title: "Jakarta",
    desc:
      "Daerah Khusus Ibukota Jakarta adalah ibu kota negara dan kota terbesar di Indonesia. Jakarta merupakan satu-satunya kota di Indonesia yang memiliki status setingkat provinsi. Jakarta terletak di pesisir bagian barat laut Pulau Jawa.",
    address: "Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta",
    coordinate: {
      lat: "-6.174675576106194",
      lng: "106.82730674565703",
    },
    location: "Monumen Nasional",
    creator: "u1",
  },
  {
    id: "p2",
    imgUrl:
      "https://lh5.googleusercontent.com/p/AF1QipMQJ4DefJRXT1qzoKFPQ16qwQIBjbO1x9FmJehA=w408-h305-k-no",
    title: "Malang",
    desc:
      "Daerah Khusus Ibukota Jakarta adalah ibu kota negara dan kota terbesar di Indonesia. Jakarta merupakan satu-satunya kota di Indonesia yang memiliki status setingkat provinsi. Jakarta terletak di pesisir bagian barat laut Pulau Jawa.",
    address: "Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta",
    coordinate: {
      lat: "-6.174675576106194",
      lng: "106.82730674565703",
    },
    location: "Monumen Nasional",
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
      address: {
        value: "",
        isValid: true,
      },
    },
    true
  );

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.desc,
            isValid: true,
          },
          address: {
            value: identifiedPlace.address,
            isValid: true,
          },
        },
        true
      );
    }
  }, [setFormData, identifiedPlace]);
  // function for set data from api

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        label="Title"
        type="text"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs?.title.value}
        initialValid={true}
      />
      <Input
        id="description"
        label="Description"
        type="text"
        element="textarea"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description(min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs?.description.value}
        initialValid={true}
      />
      <Input
        id="address"
        label="Address"
        type="text"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address"
        onInput={inputHandler}
        initialValue={formState.inputs?.address.value}
        initialValid={true}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
