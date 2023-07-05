import puppeteer from 'puppeteer';

const vsInpage = '#vs-inpage button';
const ppCheckBox = '#linkText';
const ppProceed =
  "#vs-aoyama-main-modal > div[class^='_root'] > div:nth-child(3) > div > div:nth-child(3) > button";
const genderProceed =
  "#vs-aoyama-main-modal > div[class^='_root'] > div:nth-child(3) > div > div:nth-child(4) > button";
const bodyProceed =
  "#vs-aoyama-main-modal > div[class^='_root'] > div:nth-child(3) > div > div:nth-child(5) > button";

export async function vsSniffer(url, timeout) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const width = 1500; // Set your desired width
  const height = 1500; // Set your desired height

  await page.setViewport({ width, height });

  await page.setRequestInterception(true);

  let postDataArray = [];
  let activityTimeout;

  setTimeout(() => {
    console.log('clicking inpage');
    async function clickButton() {
      const inpageButton = await page.$(vsInpage);
      await inpageButton.click();
    }
    clickButton();
  }, 10000);

  setTimeout(() => {
    async function clickButton() {
      console.log('clicking checkbox');
      const checkBox = await page.$(ppCheckBox);
      const nextElementHandle = await checkBox.evaluateHandle(
        (node) => node.nextElementSibling
      );
      const nextElement = await nextElementHandle.asElement();
      nextElement.click();
    }
    clickButton();
  }, 11000);

  setTimeout(() => {
    console.log('clicking proceed');
    async function clickButton() {
      const proceed = await page.$(ppProceed);
      await proceed.click();
    }
    clickButton();
  }, 12000);

  setTimeout(() => {
    console.log('clicking genderProceed');
    async function clickButton() {
      const proceed = await page.$(genderProceed);
      await proceed.click();
    }
    clickButton();
  }, 13000);

  setTimeout(() => {
    console.log('clicking bodyProceed');
    async function clickButton() {
      const proceed = await page.$(bodyProceed);
      await proceed.click();
    }
    clickButton();
  }, 16000);

  setTimeout(() => {
    console.log('displaying body');
  }, 17000);

  setTimeout(() => {
    console.log('');
    console.log('###############################################');
    console.log('Events Fired 🔥🔥🔥');
    console.log('###############################################');
    console.log('');

    postDataArray.forEach((data) => {
      console.log('Name: ', data.name);
      console.log('Source: ', data.source);
      console.log('StoreName: ', data.storeName);
      if (data.isKid) console.log('isKid :', data.isKid);
      console.log();
    });
  }, 20000);

  setTimeout(async () => {
    console.log('closing program');
    await browser.close();
    process.exit(0);
  }, 30000);

  page.on('request', async (request) => {
    clearTimeout(activityTimeout);

    if (request.url().includes('events.virtusize')) {
      if (request.method() === 'POST') {
        const postData = await request.postData();
        if (postData) {
          const postDataObject = JSON.parse(postData);
          postDataArray.push(postDataObject);
          console.log(postDataObject);
        }
      }
    }

    // activityTimeout = setTimeout(async () => {

    // }, timeout);

    request.continue();
  });

  console.log('sniffing VS on: ', url);

  await page.goto(url);
}
