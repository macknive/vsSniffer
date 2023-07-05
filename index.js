import { vsSniffer } from './vsSniffer.js';
//import { urls } from './urls.js'

const url = 'https://shop.adidas.jp/products/HC4509/';
(async () => {
  await vsSniffer(url, 5000);
})();
