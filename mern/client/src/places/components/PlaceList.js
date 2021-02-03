import React from "react";
import "./PlaceList.css";
import Card from "../../shared/components/UIElements/Card/Card";
import PlaceItem from "./PlaceItem";
const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <Card>
        <h2>No places found. Maybe create one ? </h2>
        <button>Share Place</button>
      </Card>
    );
  } else {
    return (
      <ul className="place-list">
        {props.items.map((item) => {
          return (
            <PlaceItem
              key={item.id}
              id={item.id}
              image={item.imgUrl}
              title={item.title}
              desc={item.desc}
              address={item.address}
              creatorId={item.creator}
              coordinates={item.coordinate}
              location={item.location}
            />
          );
        })}
      </ul>
    );
  }
};

export default PlaceList;
