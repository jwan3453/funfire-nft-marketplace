import React from 'react'
import Style from "../styles/index.module.css";
import { 
  HeroSection, 
  Service, 
  BigNFTSilder,
  Subscribe,
  FollowerTab, 
  AudioLive, 
  Collection, 
  Filter, 
  NFTCard, 
  Title, 
  Category,
  Slider ,
  Brand,
  Video,
} from '../components/componentIndex';
const  Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection></HeroSection>
      <Service />
      <BigNFTSilder/>
      <Title
        heading="Nft Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Collection />
      <FollowerTab />
      <Subscribe/>
      <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Category />

      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Filter />
      <NFTCard />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <AudioLive/>
      <Slider/>
      <Brand />
      <Video />
    </div>
  )
}

export default  Home