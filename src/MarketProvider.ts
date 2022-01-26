import { SymbolInfo } from ".";

/**
 * Market provider config
 */
export interface MPconfig {
  // Default/common config
  key?: string;
  secret?: string;
  host?: string;
  port?: string;

  // Other configs
  [x: string]: any;
}

/**
 * MarketData Provider abstractor
 * @provides @MPconfig for instance
 */
export abstract class MarketProvider {
  // TODO we only care about the streamed symbols, not historical data
  //   TODO streamed symbols for clustering incase multiple servers are running the same provider with same cred
  // Symbols which are being streamed by this provider
  streams: SymbolInfo[];

  config: MPconfig;
  constructor(config: MPconfig) {
    this.config = config;
  }
}
