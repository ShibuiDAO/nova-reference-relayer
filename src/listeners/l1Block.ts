import type { PieceContext } from '@sapphire/pieces';
import { Listener } from '../lib/structures/Listener';

export class CoreEvent extends Listener {
	public constructor(context: PieceContext) {
		super(context, { event: 'block', emitter: 'l1Provider' });
	}

	public run(block: number) {
		console.log(`[L1] Block @ ${block}`);
	}
}
