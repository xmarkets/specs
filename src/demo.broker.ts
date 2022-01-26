import { GetSymbolData, MarketData, SymbolInfo } from "./interfaces";

import { MarketBroker } from "./MarketBroker";
import { MarketProvider, MPconfig } from "./MarketProvider";


/**
 * A demo imaginary provider 
 */
export class DemoProvider implements MarketProvider {
  streams: SymbolInfo[];
  config: MPconfig;
  constructor(config?: MPconfig){
    this.config = config;
  }
};

/**
 * A Demo Imaginary Broker using the abstractions.
 */
export class DemoBroker implements MarketBroker {
  provider: MarketProvider;
  events: Event;

  constructor(provider: MarketProvider) {
    this.provider = provider;
  }
  public search<T>(args: SymbolInfo & T): Promise<SymbolInfo & T[]> {
    throw new Error("Method not implemented.");
  }
  public quote<T>(args: SymbolInfo & T): Promise<MarketData & T> {
    throw new Error("Method not implemented.");
  }
  public subMarketData<T>(args: GetSymbolData & T): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public subPriceUpdate<T>(args: GetSymbolData & T): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

const demoApp = () => {
  const dProvider = new DemoProvider();

  const dBroker = new DemoBroker(dProvider);

  dBroker.

}