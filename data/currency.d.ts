declare module Currency {
  export interface Official {
    sale: number;
  }

  export interface Parralel {
    purchase: number;
    sale: number;
  }

  export interface DZDEUR {
    timeStamp: number;
    official: Official;
    parralel: Parralel;
  }

  export interface DZDUSD {
    timeStamp: number;
    official: Official;
    parralel: Parralel;
  }

  export interface DZDGBP {
    timeStamp: number;
    official: Official;
    parralel: Parralel;
  }

  export interface CurrencyExchange {
    DZDEUR: DZDEUR[];
    DZDUSD: DZDUSD[];
    DZDGBP: DZDGBP[];
  }
}
