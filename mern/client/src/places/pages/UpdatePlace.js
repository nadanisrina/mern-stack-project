import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input"
import Button from "../../shared/components/FormElements/Button"
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from "../../shared/util/validators"

const DUMMY_PLACES = [
  {
    id: "p1",
    imgUrl:
      "https://lh5.googleusercontent.com/p/AF1QipPqGkkLoB6iHeXCUgOs6O5EtSno5UKnE0_goWxD=w408-h327-k-no",
    title: "Jakarta",
    desc:
      "Daerah Khusus Ibukota Jakarta adalah ibu kota negara dan kota terbesar di Indonesia. Jakarta merupakan satu-satunya kota di Indonesia yang memiliki status setingkat provinsi. Jakarta terletak di pesisir bagian barat laut Pulau Jawa.",
    address: "Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta",
    creator: "p1",
    coordinate: {
      lat: "-6.174675576106194",
      lng: "106.82730674565703",
    },
    location: "Monumen Nasional",
  },
  {
    id: "p2",
    imgUrl:
      "https://lh5.googleusercontent.com/p/AF1QipMQJ4DefJRXT1qzoKFPQ16qwQIBjbO1x9FmJehA=w408-h305-k-no",
    title: "Malang",
    desc:
      "Daerah Khusus Ibukota Jakarta adalah ibu kota negara dan kota terbesar di Indonesia. Jakarta merupakan satu-satunya kota di Indonesia yang memiliki status setingkat provinsi. Jakarta terletak di pesisir bagian barat laut Pulau Jawa.",
    address: "Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta",
    creator: "p2",
    coordinate: {
      lat: "-6.174675576106194",
      lng: "106.82730674565703",
    },
    location: "Monumen Nasional",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }
  return <form className="place-form">
      <Input
          id="title"
          label="Title"
          type="text"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={() => {}}
          value={identifiedPlace.title}
          valid={true}
        />
         <Input
          id="description"
          label="Description"
          type="text"
          element="textarea"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description(min. 5 characters)."
          onInput={() => {}}
          value={identifiedPlace.desc}
          valid={true}
        />
        <Button type="submit" disabled={true}>UPDATE PLACE</Button>

  </form>
};

export default UpdatePlace;
