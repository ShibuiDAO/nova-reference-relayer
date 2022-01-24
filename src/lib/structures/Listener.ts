// https://github.com/sapphiredev/framework/blob/main/src/lib/structures/Listener.ts
import { Piece } from '@sapphire/pieces';
import type { EventFilter } from 'ethers';
import type { EventEmitter } from 'events';
import type { Relayer } from '../Relayer';

export abstract class Listener<O extends Listener.Options = Listener.Options> extends Piece<O> {
	public readonly emitter: EventEmitter | null;
	public readonly event: string | EventFilter | symbol;
	public readonly once: boolean;

	private _listener: ((...args: any[]) => void) | null;

	public constructor(context: Listener.Context, options: O = {} as O) {
		super(context, options);

		this.emitter =
			typeof options.emitter === 'undefined'
				? this.container.relayer
				: (typeof options.emitter === 'string' ? (Reflect.get(this.container.relayer, options.emitter) as EventEmitter) : options.emitter) ??
				  null;
		this.event = options.event ?? this.name;
		this.once = options.once ?? false;

		this._listener = this.emitter && this.event ? (this.once ? this._runOnce.bind(this) : this._run.bind(this)) : null;

		// If there's no emitter or no listener, disable:
		if (this.emitter === null || this._listener === null) this.enabled = false;
	}

	public abstract run(...args: unknown[]): unknown;

	public onLoad() {
		if (this._listener) {
			const emitter = this.emitter!;

			// Increment the maximum amount of listeners by one:
			const maxListeners = emitter.getMaxListeners();
			if (maxListeners !== 0) emitter.setMaxListeners(maxListeners + 1);

			emitter[this.once ? 'once' : 'on'](this.event as any, this._listener);
		}
		return super.onLoad();
	}

	public onUnload() {
		if (!this.once && this._listener) {
			const emitter = this.emitter!;

			// Increment the maximum amount of listeners by one:
			const maxListeners = emitter.getMaxListeners();
			if (maxListeners !== 0) emitter.setMaxListeners(maxListeners - 1);

			emitter.off(this.event as any, this._listener);
			this._listener = null;
		}

		return super.onUnload();
	}

	private async _run(...args: unknown[]) {
		try {
			await this.run(...args);
		} catch (err) {
			throw err;
		}
	}

	private async _runOnce(...args: unknown[]) {
		await this._run(...args);
		await this.unload();
	}
}

export interface ListenerOptions extends Piece.Options {
	readonly emitter?: keyof Relayer | EventEmitter;
	readonly event?: string | EventFilter | symbol;
	readonly once?: boolean;
}

export namespace Listener {
	export type Options = ListenerOptions;
	export type Context = Piece.Context;
}
