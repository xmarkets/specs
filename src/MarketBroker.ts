import { GetSymbolData, MarketData, SymbolInfo } from "./interfaces";

import { MarketProvider } from "./MarketProvider";

export interface BrokerEvents {
  // onMarketData
  onMarketData: (data: MarketData[]) => Promise<any>;

  // onPriceUpdates
  onPriceUpdate: (data: MarketData[]) => Promise<any>;
}

type SubMarkets<T> = GetSymbolData & T;

/**
 * A market data broker abstraction
 * Extends Events
 */
export abstract class MarketBroker {
  provider: MarketProvider;
  events: Event;

  constructor(marketProvider: MarketProvider) {
    this.provider = marketProvider;
  }

  public abstract search<T>(args: SymbolInfo & T): Promise<SymbolInfo & T[]>;
  public abstract quote<T>(args: SymbolInfo & T): Promise<MarketData & T>;

  public abstract subMarketData<T>(args: SubMarkets<T>): Promise<void>;
  public abstract subPriceUpdate<T>(args: SubMarkets<T>): Promise<void>;
}

export default MarketBroker;
