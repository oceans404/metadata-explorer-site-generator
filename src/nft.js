import { openInNewTab } from './helpers';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import DetailPanel from './detailPanel';
import { roundToDecimal } from './helpers';
import { nftRarityData } from './aaaDataFromScraper';

const NFT = (props) => {
  const {
    nft,
    showAllAttributeText = false,
    title = null,
    className = '',
    price,
    lastSale,
  } = props;

  return (
    <div key={nft.id} className={`nftDiv ${className}`}>
      {title ? (
        title
      ) : (
        <Link to={`/id/${nft.id}`}>
          <h3 className={nft.rank < nftRarityData.length / 5 ? 'green' : 'red'}>
            {nft.id}
          </h3>
        </Link>
      )}{' '}
      <div
        onClick={() => openInNewTab(nft.openseaUrl)}
        data-tip
        data-for='nftImgOpensea'
      >
        <img alt={nft.id} className='nft' src={nft.image || nft.image_url} />
      </div>
      <ReactTooltip id='nftImgOpensea' aria-haspopup='true'>
        <span>🔗 Opensea</span>
      </ReactTooltip>
      <h5 className={'save-space-top save-space-bottom'}>
        {price ? roundToDecimal(price) + ' ETH' : '-'}
      </h5>
      {lastSale && (
        <p className='bold save-space-top'>
          Last sale: {roundToDecimal(lastSale)} ETH
        </p>
      )}
      {showAllAttributeText && <DetailPanel nft={nft} showRank />}
    </div>
  );
};

export default NFT;
