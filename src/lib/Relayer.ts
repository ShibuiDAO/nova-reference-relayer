import { container, StoreRegistry } from '@sapphire/pieces';
import EventEmitter from 'events';
import { join } from 'path';
import { ListenerStore } from './structures/ListenerStore';

export class Relayer extends EventEmitter {
	public stores: StoreRegistry;

	public constructor() {
		super();

		container.relayer = this;

		this.stores = new StoreRegistry();
		container.stores = this.stores;

		this.stores.register(new ListenerStore().registerPath(join(__dirname, '..', 'listeners')));
	}
}

declare module '@sapphire/pieces' {
	interface Container {
		relayer: Relayer;
		stores: StoreRegistry;
	}

	interface StoreRegistryEntries {
		listeners: ListenerStore;
	}
}
