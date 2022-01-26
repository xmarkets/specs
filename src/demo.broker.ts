/* eslint-disable */
import { GetSymbolData, MarketData, SymbolInfo } from "./interfaces";
import { MPconfig, MarketProvider } from "./MarketProvider";

import Events from "events";
import { MarketBroker } from "./MarketBroker";

/**
 * A demo imaginary provider
 * All providers extend/provide their own Event
 */
export class DemoProvider extends MarketProvider {
  streams: SymbolInfo[];
  config: MPconfig;

  constructor(config?: MPconfig) {
    super(config);
    this.config = config;
  }

  public addToSteams(): Promise<void> {
    // TODO do some market data margic, then emit later from any method
    throw new Error("Method not implemented.");
  }
  public removeFromSteams(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public getMarketData<T>(args: GetSymbolData & T): Promise<void> {
    throw new Error("Method not implemented.");
    // do some market then emit to self
    // this.emit();
  }

  public getSteams(): SymbolInfo[] {
    return this.streams;
  }
}

/**
 * A Demo Imaginary Broker using the abstractions.
 */
export class DemoBroker implements MarketBroker {
  provider: MarketProvider;
  when: Events;

  constructor(provider: MarketProvider) {
    this.setProvider(provider);
  }

  public setProvider(provider: MarketProvider): void {
    /**
     * Look for previous streams from old provider and re-add them to new provider
     */

    let existingStreams = [];
    if (this.provider) {
      // existing provider, migrate streams to new one
      existingStreams = this.provider.getSteams();
    }
    this.provider = provider;
    this.initProvider(provider, existingStreams); // add existing streams from old if exits
  }

  public initProvider(provider: MarketProvider, streams?: SymbolInfo[]): void {
    // Market data subscribers
    provider.on("", () => {
      this.when.emit("someEvent", {});
    });

    // TODO ... add others events

    // e.t.c ....

    // subscribe if steams has length
    if (streams.length > 0) {
      streams.forEach((stream) => {
        this.subPriceUpdate(stream);
      });
    }
  }

  public search<T>(args: SymbolInfo & T): Promise<SymbolInfo & T[]> {
    throw new Error("Method not implemented.");
    // provider.getSec
  }
  public quote<T>(args: SymbolInfo & T): Promise<MarketData & T> {
    throw new Error("Method not implemented.");
    // provider.getQuote ASYNC
  }
  public subMarketData<T>(args: GetSymbolData & T): Promise<void> {
    throw new Error("Method not implemented.");
    // provider.getMarketData VOID
  }
  public subPriceUpdate<T>(args: SymbolInfo & T): Promise<void> {
    throw new Error("Method not implemented.");
    // provider.addToStreams VOID
  }
}

/**
 * Somewhere withing my nodejs app, using my imaginary provider(s) and it's broker.
 * @goal only one broker, @multiple providers incase one dies out.
 * @goal @demoApp doesn't need to change it's listeners.
 */
const demoApp = async () => {
  // Create a first provider
  const dProvider = new DemoProvider();
  // TODO end using the first provider from here

  // create it's broker abstraction
  const dBroker = new DemoBroker(dProvider);

  // TODO case 1
  // now how to subscribe to data
  dBroker.when.on("someEvent", () => {});

  // TODO case 2
  // to sub to data
  await dBroker.subMarketData({ symbol: "APPL", startDate: new Date() });

  // meaning this will not kill case 1 and 2,
  // but just change the provider, incase provide dies or is not responsive
  const dProvider2 = new DemoProvider();
  dBroker.setProvider(dProvider2); // this resets implementations in broker, but broker events in 1 and 2 are still there
};
