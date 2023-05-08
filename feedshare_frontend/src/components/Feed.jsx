import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { feedQuery, searchQuery } from "../utils/data";

const Feed = () => {
  // Spinner state
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);

  // Params to know at what site we are
  const { categoryID } = useParams();

  //Fetch search query. query is defined in utils/data
  useEffect(() => {
    setLoading(true);
    if (categoryID) {
      const query = searchQuery(categoryID);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryID]);

  if (loading) return <Spinner message="Adding new images to your feed" />;
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
