const { getChainId } = require('hardhat');
const { deployAndGetContract } = require('@1inch/solidity-utils');

module.exports = async ({ getNamedAccounts, deployments }) => {
    const PARAMS = {
        contractName: 'OffchainOracle',
        constructorArgs: [],
        deploymentName: 'OffchainOracle',
    };

    console.log('running deploy script: simple-deploy');
    console.log('network id ', await getChainId());

    const { deployer } = await getNamedAccounts();

    await deployAndGetContract({
        ...PARAMS,
        deployments,
        deployer,
    });
};

module.exports.skip = async () => true;
