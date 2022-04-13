%%%%%%%%%%% creating a project %%%%%%%%%%%%%

// come to directory

npm init -y
npm install --save-dev hardhat

npx hardhat

// seç -> "create a new project"
// bunu seçince zaten .gitignore, scripts, contracts, artifacts vs oluşuyor
// gitignore de güzel gitignore ellemeye gerek yok

npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
npm install @openzeppelin/contracts
npm install --save dotenv
npm i -D @nomiclabs/hardhat-etherscan

%%%%%%%% .env isimli file oluştur %%%%%%%%%

// gizli şeyler için kullanılacak, içi aşağıdaki gibi olsun

STAGING_ALCHEMY_KEY=BLAHBLAH // rinkeby alchemy key
PROD_ALCHEMY_KEY=BLAHBLAH // mainnet alchemy key
PRIVATE_KEY=BLAHBLAH // cüzdandan
API_KEY=BLAHBLAH // etherscan.io'dan

// blahblah'lar sanırım string olmalı deneyemedim

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


%%%%%%%%%% hardhat.config.js %%%%%%%%%%%%

// içi aşağıdaki gibi olsun

require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: '0.8.13',
  etherscan: {
    apiKey: process.env.API_KEY,
  },
  networks: {
    rinkeby: {
      url: process.env.STAGING_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
    mainnet: {
      chainId: 1,
      url: process.env.PROD_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


%%%%%%%%%%%%% deployment %%%%%%%%%%%%%%

//scripts klasörü oluşturulup içine deploy.js oluşturulacak ve şuna benzeyecek

const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("KONTRATININ ADI"); //.sol dosyandaki kontratın ismini gireceksin
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

// bu varsa alttaki kodu çalıştırabilirsin

npx hardhat run scripts/deploy.js --network NETWORK // düz rinkeby ya da mainnet yazılıyor

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


%%%%%%%%% verification %%%%%%%%%%%%%%%

npx hardhat verify YOUR_CONTRACT_ADDRESS --network rinkeby