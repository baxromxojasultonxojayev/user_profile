import React, { useState } from "react";
import { Link, List, ListItem } from "@mui/material";
import "./style.scss";

const MenuList = () => {
  const menus = [
    { page: "Home", link: "/" },
    { page: "Products", link: "/products" },
    { page: "Contact Us", link: "/contact" },
    { page: "Private Cabine", link: "/private" },
  ];
  return (
    <div className="navbar">
      <List className="menu-list">
        {menus.map((listItem, idx) => (
          <ListItem className="menu-item" key={idx}>
            <a href={listItem.link}>{listItem.page}</a>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MenuList;
