import React, { useState, useEffect, useContext } from "react";
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
  Loader,

} from '../components/componentIndex';
import { getTopCreators } from "../TopCreators/TopCreators";
import { NFTMarketplaceContext, } from '../context/NFTMarketplaceContext';

const  Home = () => {

  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const { checkIfWalletConnected, currentAccount, fetchNFTs } = useContext(
    NFTMarketplaceContext
  );

  useEffect(() => {

    checkIfWalletConnected()
    // alert('indexpage')
    fetchNFTs().then((items) => {

      console.log('indexpage', nfts);
      items && setNfts(items.reverse());
      setNftsCopy(items);
    });
  }, [])

  const creators = getTopCreators(nfts);
  console.log('creators', creators);

  return (
    <div className={Style.homePage}>
      <HeroSection></HeroSection>
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      {/* <Filter /> */}
      {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts} />}
      <BigNFTSilder/>
      <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <AudioLive />
      {creators.length == 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreator={creators} />
      )}

      <Slider />
      <Collection />

      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />
      <Subscribe />
      <Brand />
      <Video />
    </div>
  )
}

export default  Home