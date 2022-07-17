import React, { Fragment } from "react";
import Banner from "./Banner/Banner";
import CoinsTable from "./CoinsTable.js";
import "./Home.css";

const Home = () => {
  return (
    <Fragment>
      <Banner />
      <CoinsTable />
    </Fragment>
  );
};

export default Home;
