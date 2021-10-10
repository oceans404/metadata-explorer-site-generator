import { nftRarityData } from './aaaDataFromScraper';

const parseContractAddress = (nftData) => {
  if (nftData) {
    const [, addressAndId] = nftData.openseaUrl.split('assets/');
    return addressAndId.split('/')[0];
  }
  return null;
};

export const contractAddress = parseContractAddress(nftRarityData[0]);
