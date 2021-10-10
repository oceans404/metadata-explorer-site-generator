import { Link } from 'react-router-dom';
import { traitsMap, nftRarityData } from './aaaDataFromScraper';
import { makePercent } from './helpers';

function DetailPanel(props) {
  const {
    nft,
    className = '',
    title = null,
    showRank = false,
    showLabel = false,
  } = props;
  return (
    <div className={className}>
      {title}
      {showRank && <p>Rank: {nft.rank}</p>}
      {Object.keys(nft.attributes).map((currTrait, i) => {
        const currValue = nft.attributes[currTrait].toString();
        return (
          <div className='traitKeyValue' key={`${currTrait}-${currValue}-${i}`}>
            {showLabel && <p className='label'>{currTrait}</p>}
            <p className='value'>
              {traitsMap &&
                traitsMap[currTrait] &&
                traitsMap[currTrait][currValue] &&
                nftRarityData &&
                makePercent(
                  traitsMap[currTrait][currValue].length,
                  nftRarityData.length
                )}
              % -{' '}
              <Link to={`/trait/${currTrait}/${currValue}`}>{currValue}</Link>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default DetailPanel;
