export interface IPaywallPricing {
  priceId: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  interval: string;
}

export interface IPaywallConfig {
  prices: IPaywallPricing[];
}

export interface IConfig {
  paywall: IPaywallConfig;
  [key: string]: any;
} 