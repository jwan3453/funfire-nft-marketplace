import React, { useState, useEffect, useRef } from "react";
import { motion } from 'framer-motion';
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";


import Style from "./Slider.module.css";
import SliderCard from "./SliderCard/SliderCard";
import images from "../../img";
export const Slider = () => {

  const FollowingArray = [
    {
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
    } ,
    {
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
    },
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
    },
  ];

	const [width, setWidth] = useState(0);
	return (
		<div>Slider</div>
	)
}
		