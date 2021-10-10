import NFT from './nft';
import { nftRarityData } from './aaaDataFromScraper';

function NftGrid(props) {
  const { ids } = props;
  return (
    <div className='nfts'>
      {ids.map((id) => {
        const nft = nftRarityData.find((n) => n.id === id);
        return (
          <NFT
            nft={nft}
            showAllAttributeText={true}
            // trait={trait}
            // price={
            //   priceData && priceData[nft.id] && priceData[nft.id].sell_orders
            // }
            // lastSale={
            //   priceData && priceData[nft.id] && priceData[nft.id].last_sale
            // }
          />
        );
      })}
    </div>
  );
}

export default NftGrid;
