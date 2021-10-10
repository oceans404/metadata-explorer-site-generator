import { useEffect, useState } from 'react';
import NFT from './nft';
import DetailPanel from './detailPanel';
import { nftRarityData } from './aaaDataFromScraper';

import { getOpenseaData } from './callOpensea';
import { roundToDecimal, makePercent } from './helpers';

const displayRarityStatus = (rank, total) => {
  const reversePercentile = makePercent(rank, total);
  let rareStatus = '🚯 Common';
  if (reversePercentile < 10) {
    rareStatus = '🤑 Most rare';
  } else if (reversePercentile < 25) {
    rareStatus = '💰 Rare';
  } else if (reversePercentile < 50) {
    rareStatus = '😐 Above average';
  }
  return (
    <h3>
      {rareStatus} -{' '}
      {reversePercentile < 50
        ? `top ${reversePercentile}`
        : `bottom ${100 - reversePercentile}`}
      %
    </h3>
  );
};

function SingleNftView(props) {
  const id = props.match.params.id;
  const thisNft = nftRarityData.find((nft) => nft.id === parseInt(id));

  const [priceData, setPriceData] = useState(null);
  const [lastSaleData, setLastSaleData] = useState(null);

  useEffect(() => {
    if (!priceData) {
      getOsPriceData();
    }
  }, []);

  const getOsPriceData = async () => {
    const osPriceData = await getOpenseaData([thisNft.id]);
    setPriceData(osPriceData[thisNft.id].sell_orders);
    setLastSaleData(osPriceData[thisNft.id].last_sale);
  };

  return (
    thisNft && (
      <div className='singleNft'>
        <NFT
          className='singleNftView'
          nft={thisNft}
          price={priceData}
          lastSale={lastSaleData}
          title={
            <h2>
              {thisNft.id} - #{thisNft.rank} / {nftRarityData.length}
            </h2>
          }
        />
        <DetailPanel
          nft={thisNft}
          className='nftDiv singleNftView singleNftViewDetailPanel'
          title={displayRarityStatus(thisNft.rank, nftRarityData.length)}
          showLabel
        />
      </div>
    )
  );
}

export default SingleNftView;
