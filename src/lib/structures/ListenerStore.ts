// https://github.com/sapphiredev/framework/blob/main/src/lib/structures/ListenerStore.ts
import { Store } from '@sapphire/pieces';
import { Listener } from './Listener';

export class ListenerStore extends Store<Listener> {
	public constructor() {
		super(Listener as any, { name: 'listeners' });
	}
}
