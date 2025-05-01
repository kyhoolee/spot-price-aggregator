require('dotenv').config(); // 👈 this line loads your .env variables

require('@matterlabs/hardhat-zksync-deploy');
require('@matterlabs/hardhat-zksync-solc');
require('@nomicfoundation/hardhat-ethers');
require('@nomicfoundation/hardhat-chai-matchers');
require('hardhat-deploy');
require('hardhat-dependency-compiler');
require('hardhat-gas-reporter');
require('hardhat-tracer');
require('solidity-coverage');
require('solidity-docgen');

const { oneInchTemplates } = require('@1inch/solidity-utils/docgen');
const { Networks, getNetwork } = require('@1inch/solidity-utils/hardhat-setup');

if (getNetwork().indexOf('zksync') !== -1) {
    require('@matterlabs/hardhat-zksync-verify');
} else {
    require('@nomicfoundation/hardhat-verify');
}

const { networks, etherscan } = (new Networks(true, 'avax', true)).registerAll();

networks.hardhat.chains = {
    43114: {
        hardforkHistory: {
            shanghai: 11404279,  // fake numbers to satisfy Hardhat
            cancun: 41263126,
        },
    },
};

module.exports = {
    solidity: {
        version: '0.8.23',
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000000,
            },
            evmVersion: networks[getNetwork()]?.hardfork || 'shanghai',
            viaIR: true,
        },
    },
    etherscan,
    networks,
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    paths: {
        deploy: 'deploy/commands',
    },
    mocha: {
        timeout: 300000,
    },
    tracer: {
        enableAllOpcodes: true,
    },
    dependencyCompiler: {
        paths: [
            '@1inch/solidity-utils/contracts/interfaces/ICreate3Deployer.sol',
            '@1inch/solidity-utils/contracts/interfaces/IWETH.sol',
            '@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol',
        ],
    },
    zksolc: {
        version: '1.5.1',
        compilerSource: 'binary',
        settings: {},
    },
    docgen: {
        outputDir: 'docs',
        templates: oneInchTemplates(),
        pages: 'files',
        exclude: ['mocks'],
    },
};
