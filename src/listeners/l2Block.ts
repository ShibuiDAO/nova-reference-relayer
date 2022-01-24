import type { PieceContext } from '@sapphire/pieces';
import { Listener } from '../lib/structures/Listener';

export class CoreEvent extends Listener {
	public constructor(context: PieceContext) {
		super(context, { event: 'block', emitter: 'l2Provider' });
	}

	public run(block: number) {
		console.log(`[L2] Block @ ${block}`);
	}
}
