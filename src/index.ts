import { alchemyL1ApiKey, alchemyL2ApiKey, l1ChainID, l2ChainID } from './config';
import { Relayer } from './lib/Relayer';

async function main() {
	const relayer = new Relayer({
		l1AlchemyApiKey: alchemyL1ApiKey,
		l1Network: l1ChainID,
		l2AlchemyApiKey: alchemyL2ApiKey,
		l2Network: l2ChainID
	});

	await relayer.start();
}

void main();
