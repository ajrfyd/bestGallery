import React from "react";
import styled from "styled-components";
import Header from "../containers/Header/Header";
import Search from "../containers/Search/Search";
import { Outlet } from "react-router-dom";

const TopComponent = () => {

  return (
    <>
      <Header />
      <Search />
      <Outlet />
    </>
  )
}

export default TopComponent;