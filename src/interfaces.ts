/**
 * Security Type
 */
export enum SecType {
  STOCK = "stock",
  CRYPTO = "crypto",
  // TODO to add forex, index, e.t.c
}

/**
 * Symbol Info
 */
export interface SymbolInfo {
  symbol: string;
  secType?: SecType;
}

export interface GetSymbolData extends SymbolInfo {
  startDate: Date;
  endDate?: Date;

  //TODO other fields if required from other market data providers
  [x: string]: any;
}

export interface MosaicData extends SymbolInfo {
  [x: string]: any;
}

export interface MarketData {
  symbol: string;

  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;

  date: Date;

  //   TODO others provided by market providers
  [x: string]: any;
}
