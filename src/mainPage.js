import './App.css';
import { useState, useEffect } from 'react';
import NFT from './nft';

import { openInNewTab } from './helpers';
import { traitsMap, nftRarityData } from './aaaDataFromScraper';
import { getOpenseaData } from './callOpensea';
import { makePercent } from './helpers';

const rangeFrom = (startId, length) => {
  const r = [];
  for (let i = startId; i < startId + length; i++) {
    r.push(i);
  }
  return r;
};

function App(props) {
  const trait = props?.match?.params?.trait;
  const attributeValue = props?.match?.params?.val;
  const [links, setLinks] = useState(0);
  const [showAllAttributeText, toggleShowAllAttributeText] = useState(false);
  const [shouldFilterForBuyNow, toggleShouldFilterForBuyNow] = useState(false);
  const [shouldFilterForUnderEth, toggleShouldFilterForUnderEth] =
    useState(false);
  const [maxShow, setMaxShow] = useState(30);
  const [maxLinksBatchOffPage] = useState(5);
  const attributeName = trait || null;

  const filteredNftData = attributeName
    ? nftRarityData.filter((n) => {
        if (attributeValue) {
          const possibleNumber = parseInt(attributeValue);
          const val = isNaN(possibleNumber) ? attributeValue : possibleNumber;
          return (
            !!n.attributes[attributeName] &&
            n.attributes[attributeName].includes(val)
          );
        } else {
          return !!n.attributes[attributeName];
        }
      })
    : nftRarityData;

  const openOpenseaPage = (n) => {
    const iters = rangeFrom(n, maxLinksBatchOffPage);
    for (let i of iters) {
      if (filteredNftData[i]) {
        openInNewTab(filteredNftData[i].openseaUrl);
      }
    }
    setLinks(n + maxLinksBatchOffPage);
  };

  const [priceData, setPriceData] = useState(null);

  useEffect(() => {
    if (!priceData) {
      getOsPriceData(maxShow);
    }
  }, []);

  useEffect(() => {
    if (!priceData) {
      getOsPriceData(maxShow);
    }
    getOsPriceData(maxShow);
  }, [maxShow, shouldFilterForBuyNow, attributeName, attributeValue]);

  const getOsPriceData = async (newMaxShow) => {
    const nftIds =
      filteredNftData &&
      filteredNftData
        .slice(0, newMaxShow)
        .filter((nft) => !priceData || !priceData[nft.id])
        .map((d) => d.id);
    const osPriceData = await getOpenseaData(nftIds);
    setPriceData({ ...priceData, ...osPriceData });
  };

  return (
    <div className='App'>
      <div className='section-top'>
        <div className='section-title'>
          <h2 className='save-space-bottom'>
            {trait || 'Top Ranked NFTs'}
            {attributeValue && `: ${attributeValue}`}
            {trait && attributeValue && nftRarityData && (
              <span>
                {' '}
                (
                {makePercent(
                  traitsMap[trait][attributeValue].length,
                  nftRarityData.length
                )}
                %)
              </span>
            )}
          </h2>
          {attributeValue &&
            traitsMap &&
            trait &&
            traitsMap[trait] &&
            attributeValue &&
            traitsMap[trait][attributeValue] &&
            nftRarityData && (
              <h4 className='save-space-top'>
                {traitsMap[trait][attributeValue].length} /{' '}
                {nftRarityData.length}
              </h4>
            )}
        </div>

        <div className='section-settings'>
          <button
            className='button_slide slide_in'
            onClick={() => toggleShouldFilterForBuyNow(!shouldFilterForBuyNow)}
          >
            {shouldFilterForBuyNow ? 'Include unlisted' : 'Buy now'}
          </button>
          <button
            className='button_slide slide_in'
            onClick={() =>
              toggleShouldFilterForUnderEth(!shouldFilterForUnderEth)
            }
          >
            {shouldFilterForUnderEth ? 'Include > 1 ETH' : '<= 1 ETH'}
          </button>

          <button
            className='button_slide slide_in'
            onClick={() => openOpenseaPage(links)}
          >
            Opensea {links + 1} to {links + maxLinksBatchOffPage}
          </button>
          <button
            className='button_slide slide_in'
            onClick={() => toggleShowAllAttributeText(!showAllAttributeText)}
          >
            {showAllAttributeText ? 'Hide' : 'Show'} details
          </button>
        </div>
      </div>

      <div className='nfts'>
        {filteredNftData && filteredNftData.length ? (
          filteredNftData
            .filter((nft) =>
              shouldFilterForBuyNow
                ? !!priceData &&
                  !!priceData[nft.id] &&
                  !!priceData[nft.id].sell_orders
                : true
            )
            .filter((nft) =>
              shouldFilterForUnderEth
                ? !!priceData &&
                  !!priceData[nft.id] &&
                  !!priceData[nft.id].sell_orders &&
                  priceData[nft.id].sell_orders <= 1
                : true
            )
            .slice(0, maxShow)
            .map((nft, i) => (
              <NFT
                nft={nft}
                showAllAttributeText={showAllAttributeText}
                trait={trait}
                price={
                  priceData &&
                  priceData[nft.id] &&
                  priceData[nft.id].sell_orders
                }
                lastSale={
                  priceData && priceData[nft.id] && priceData[nft.id].last_sale
                }
              />
            ))
        ) : (
          <div>No matches found</div>
        )}
      </div>
      {filteredNftData.length > maxShow && (
        <button
          className='button_slide slide_in width-100'
          onClick={() => {
            const newMaxShow = maxShow + 30;
            setMaxShow(newMaxShow);
          }}
        >
          Query 30 more
        </button>
      )}
    </div>
  );
}

export default App;
