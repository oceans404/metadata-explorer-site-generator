import { useState, useEffect } from 'react';
import { traitsMap, nftRarityData } from './aaaDataFromScraper';
import NFT from './nft';
import { getOpenseaData } from './callOpensea';

const getRarestTraits = (maxTraitFrequencyInCollection) => {
  const rarestTraits = {};
  const idsWithRarestTraits = new Set();
  const attributes = Object.keys(traitsMap);
  for (let attr of attributes) {
    const values = Object.keys(traitsMap[attr]);
    for (let val of values) {
      if (
        traitsMap &&
        traitsMap[attr] &&
        traitsMap[attr][val] &&
        traitsMap[attr][val].length <= maxTraitFrequencyInCollection
      ) {
        traitsMap[attr][val].forEach(
          idsWithRarestTraits.add,
          idsWithRarestTraits
        );
        if (!rarestTraits[attr]) {
          rarestTraits[attr] = {
            ...rarestTraits[attr],
            [val]: traitsMap[attr][val],
          };
        } else {
          rarestTraits[attr] = { [val]: traitsMap[attr][val] };
        }
      }
    }
  }
  return { ids: Array.from(idsWithRarestTraits), rarestTraits };
};

function RarestTraitsPage(props) {
  const n = (props.match && props.match.params.n) || 1;
  const { ids } = getRarestTraits(n);

  const nftsToUse = ids
    .map((id) => nftRarityData.find((n) => n.id == id))
    .sort(function (a, b) {
      return a.rank - b.rank;
    })
    .slice(0, 30);

  const [priceData, setPriceData] = useState(null);

  useEffect(() => {
    if (!priceData) {
      getOsPriceData();
    }
  }, []);

  const getOsPriceData = async () => {
    const osPriceData = await getOpenseaData(nftsToUse.map((nft) => nft.id));
    console.log(osPriceData);
    setPriceData({ ...priceData, ...osPriceData });
  };

  return (
    <>
      <div>
        <div className='section-top'>
          <div className='section-title'>
            <h2>
              NFTs with 1 of {n} traits ({ids.length})
            </h2>
          </div>
        </div>
      </div>
      <div className='nfts'>
        {nftsToUse.map((nft) => (
          <NFT
            key={nft.id}
            nft={nft}
            // showAllAttributeText={true}
            price={
              priceData && priceData[nft.id] && priceData[nft.id].sell_orders
            }
            lastSale={
              priceData && priceData[nft.id] && priceData[nft.id].last_sale
            }
          />
        ))}
      </div>
    </>
  );
}

export default RarestTraitsPage;
