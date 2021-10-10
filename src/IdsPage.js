import { Link } from 'react-router-dom';
import { nftRarityData } from './aaaDataFromScraper';

function IdsPage() {
  const nfts = [...nftRarityData];
  return (
    <>
      <h2>Find NFT by ID</h2>
      <ul>
        {nfts
          .sort(function (a, b) {
            return a.id - b.id;
          })
          .map((nft) => (
            <Link to={`/id/${nft.id}`}>
              <li>{nft.id}</li>
            </Link>
          ))}
      </ul>
    </>
  );
}
export default IdsPage;
