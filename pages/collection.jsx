import React from "react";

//INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import images from "../img";
import {
  Banner,
  CollectionProfile,
  NFTCardTwo,
} from "../collectionPage/collectionIndex";
import { Slider, Brand } from "../components/componentIndex";
import Filter from "../components/Filter/Filter";

const collection = () => {
  const collectionArray = [
    {
      image: images.nft_image_1.src,
      seller: '',
      owner: '',
      name: 'demo nft'
    },
    {
      image: images.nft_image_2.src,
      seller: '',
      owner: '',
          name: 'demo nft'
    },
    {
      image: images.nft_image_3.src,
      seller: '',
      owner: '',
          name: 'demo nft'
    },
    {
      image: images.nft_image_1.src,
      seller: '',
      owner: '',
          name: 'demo nft'
    },
    {
      image: images.nft_image_2.src,
      seller: '',
      owner: '',
          name: 'demo nft'
    },
    {
      image: images.nft_image_3.src,
      seller: '',
      owner: '',
       name: 'demo nft'
    },
    {
      image: images.nft_image_1.src,
      seller: '',
      owner: '',
       name: 'demo nft'
    },
    {
      image: images.nft_image_2.src,
      seller: '',
      owner: '',
       name: 'demo nft'
    },
  ];
  console.log('collectionArray', collectionArray);
  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      <CollectionProfile />
      <Filter />
      <NFTCardTwo NFTData={collectionArray} />

      <Slider />
      <Brand />
    </div>
  );
};

export default collection;
