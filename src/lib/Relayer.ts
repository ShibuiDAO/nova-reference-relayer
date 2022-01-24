import { container, StoreRegistry } from '@sapphire/pieces';
import EventEmitter from 'events';
import { join } from 'path';
import { ListenerStore } from './structures/ListenerStore';
import { providers } from 'ethers';
import type { Networkish } from '@ethersproject/networks';

export interface RelayerOptions {
	l1Network: Networkish;
	l1AlchemyApiKey: string;

	l2Network: Networkish;
	l2AlchemyApiKey: string;
}

export class Relayer extends EventEmitter {
	public stores: StoreRegistry;

	public l1Provider: providers.AlchemyWebSocketProvider;
	public l2Provider: providers.AlchemyWebSocketProvider;

	public constructor(options: RelayerOptions) {
		super();

		this.l1Provider = new providers.AlchemyWebSocketProvider(options.l1Network, options.l1AlchemyApiKey);
		this.l2Provider = new providers.AlchemyWebSocketProvider(options.l2Network, options.l2AlchemyApiKey);

		container.relayer = this;

		this.stores = new StoreRegistry();
		container.stores = this.stores;

		this.stores.register(new ListenerStore().registerPath(join(__dirname, '..', 'listeners')));
	}

	public async start() {
		await Promise.all([...this.stores.values()].map((store) => store.loadAll()));
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
