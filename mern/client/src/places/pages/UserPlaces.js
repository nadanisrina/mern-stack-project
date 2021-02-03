import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

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
const UserPlaces = () => {
  const { userId } = useParams();
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};
export default UserPlaces;
