import { GetSymbolData, MarketData, SymbolInfo } from "./interfaces";

import Events from "events";
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
  when: Events;

  constructor(marketProvider: MarketProvider) {
    this.provider = marketProvider;
  }

  /**
   * Change the provider at some init/later point in the app
   * This resets almost all things
   * @param marketProvider
   */
  public abstract setProvider(provider: MarketProvider): void;

  /**
   * initiate provider events
   * @param marketProvider
   */
  public abstract initProvider(provider: MarketProvider): void;

  public abstract search<T>(args: SymbolInfo & T): Promise<SymbolInfo & T[]>;
  public abstract quote<T>(args: SymbolInfo & T): Promise<MarketData & T>;

  public abstract subMarketData<T>(args: SubMarkets<T>): Promise<void>;
  public abstract subPriceUpdate<T>(args: SymbolInfo & T): Promise<void>;
}

export default MarketBroker;
