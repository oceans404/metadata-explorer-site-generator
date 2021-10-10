import { contractAddress } from './getContractAddress';
function handleErrors(response) {
  if (!response.status === 200) {
    throw Error({
      type: 'ERROR',
      ...response,
    });
  }
  return response;
}

const tokenIdsQuery = (tokenIds) =>
  tokenIds && tokenIds.length
    ? tokenIds.map((id) => `token_ids=${id}`).join('&') + '&'
    : '';

const url = (tokenIds) =>
  `https://api.opensea.io/api/v1/assets?${tokenIdsQuery(
    tokenIds
  )}asset_contract_address=${contractAddress}&order_direction=desc&offset=0&limit=30`;

export const getOpenseaData = (tokenIds) => {
  return fetch(url(tokenIds))
    .then(handleErrors)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.assets) {
        const nftsOnOpensea = Object.values(data.assets);
        const sellOrders = {};
        for (let nft of nftsOnOpensea) {
          sellOrders[nft.token_id] = {
            id: nft.token_id,
            sell_orders:
              nft.sell_orders &&
              nft.sell_orders
                .filter((order) => {
                  return order.maker.address === nft.owner.address;
                })
                .map((o) => o.current_price / Math.pow(10, 18)),
            last_sale:
              nft.last_sale &&
              nft.last_sale.total_price &&
              nft.last_sale.total_price / Math.pow(10, 18),
          };
        }
        return sellOrders;
      } else {
        return ['error loading'];
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
