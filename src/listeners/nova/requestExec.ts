import type { PieceContext } from '@sapphire/pieces';
import { l2NovaRegistryAddress } from 'config';
import { utils } from 'ethers';
import { Listener } from '../../lib/structures/Listener';

export class CoreEvent extends Listener {
	public constructor(context: PieceContext) {
		super(context, {
			event: {
				address: l2NovaRegistryAddress,
				topics: [utils.id('RequestExec(bytes32,address)')]
			},
			emitter: 'l2Provider'
		});
	}

	public run(log: any, event: any) {
		console.log(log, event);
	}
}
