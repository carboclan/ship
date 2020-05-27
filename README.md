# $HIP
A platform for bootstrapping MVPs for side-projects with fair and sustainable incentive alignment. Project owners can summon flash organizations where members work towards pre-defined product milestones. Contributors who apply to a project / projects can receive puttable equity tokens for their work upon achieving the pre-defined product milestones, with an option of “exit to cash” that settles to pre-arranged strike price, exercisable within a limited timeframe.

## Getting Started

- Install [Metamask](https://metamask.io) for your browser.
- If you're new to Ethereum, get up to speed [here](https://medium.com/@mattcondon/getting-up-to-speed-on-ethereum-63ed28821bbe).

## Local Development

1. Clone the repo: `git clone https://github.com/carboclan/hip.git`
2. Install dependencies: `cd frontend && npm i` & `cd server && npm i`
3. Run concurrently: `npm start` 

## How we built it
### Client interface
We created a webApp for our front-end user interface. Users with invitation tokens will be able to register on our webApp. Upon logging in, they will be able to see the dashboard with trending projects and options to either join a project or create a new project. 
- If a user has funding or project ideas, he/she will be able to create a project. When creating the project, he/she is prompted to enter informations such as project deadline, number of contributors and their roles and project description. He/She also has the options to lend their collatroized fund to AAVE or borrow from Compound. He/She needs to collaterize DAI in exchange of puttable project tokens (equity). Upon creation, an option contract will be created on behalf of him/her and he/she will be able to invite contributors.
- If a user has specific skills and is willing to contribute to any projects, he/she will be able to join a project on the webApp. Once the project leaders accept his/her application, he/she will receive puttable tokens which will be locked in the project address. 

Once the project passed its deadline, contributors have two options regarding their puttbale tokens: redeem them or cash-out. If they choose to cash-out, the option contract will calculate and take out the equivalent amount of DAI from the collateral pool and send them to the contributor's address. If they choose to redeem puttable tokens, the project token (equity) will be sent to their address. 

### Web Service
The web service provides a REST API to the front-end interfact. It saves user information (name, password and etc.) in MongoDB. Regarding project information, it will sync the project json file to Sia Skynet and return the skynet address to the front-end.

### Proxy of Option Contract
We leverage Opyn Protocol when creating the option market and option contracts on behalf of our customer. Upon receiving project information, our proxy contract will mint project tokens and create option market by invoking the Opyn option factory contract. Once the creation of option market succeed, the proxy contract will create the option contract by invoking the opyn option contract.

### Compound Borrow Contract
Our Compound Borrow Contract will borrow DAI by supplying ETH as collateral. It also handles repay once the project ends. 

### AAVE Lending
TO-DO

### ENS
TODO

### Portis
We gives users options to use Portis wallet at the front-end. 

## Tech Stack

- Backend: Nodejs, MongoDB, Express
- Frontend: Reactjs
- Contracts: Solidity

## Deployment
$HIP Token deployend on Rinkeby [here](https://rinkeby.etherscan.io/tx/0xfd1b6774c3f129e6e470e6fd201757d1a1d4a433e35975ff7ed30e3a60f88cdb).

## Contributors

<table><tr><td align="center"><a href="https://github.com/jenil04"><img src="https://avatars3.githubusercontent.com/u/22861609?s=400&u=e28855eea949d6fe1be0d1be52e5184baa05e610&v=4" width="75px;" alt="Jenil Thakker"/><br /><sub><b>Jenil Thakker</b></sub></a><br /><a href="https://github.com/carboclan/hip/commits?author=jenil04" title="Code">💻</a></td><td align="center"><a href="https://github.com/renchuqiao"><img src="https://avatars3.githubusercontent.com/u/6487514?s=400&u=4dc44328d4c985d05782fa514a5677d5aecbbe74&v=4" width="75px;" alt="Chuqiao Ren"/><br /><sub><b>Chuqiao Ren</b></sub></a><br /><a href="https://github.com/carboclan/hip/commits?author=renchuqiao" title="Code">💻</a></td><td align="center"><a href="https://github.com/dragosrotaru"><img src="https://avatars2.githubusercontent.com/u/7482137?s=400&u=e443144a8ab9ada0f13cd7f1f7008b652819c154&v=4" width="75px;" alt="Dragos Rotaru"/><br /><sub><b>Dragos Rotaru</b></sub></a><br /><a href="https://github.com/carboclan/hip/commits?author=dragosrotaru" title="Code">💻</a></td><td align="center"><a href="https://github.com/CarboClanC"><img src="https://avatars3.githubusercontent.com/u/50804295?s=400&u=e5c09bf39e8b301ac20804a4994f32fa068c290a&v=4" width="75px;" alt="Tina Zhen"/><br /><sub><b>Tina Zhen</b></sub></a><br /><a href="https://github.com/carboclan/hip/commits?author=CarboClanC" title="Code">🎨</a></td></tr></table>
