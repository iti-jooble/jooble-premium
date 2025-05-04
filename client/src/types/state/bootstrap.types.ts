export interface PaywallPrice {
  priceId: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  interval: string;
}

export interface BootstrapConfigs {
  paywall: {
    prices: Array<PaywallPrice>;
  };
  google: {
    clientId: string;
    apiKey: string;
  };
}

export interface BootstrapState {
  isLoading: boolean;
  error: string | null;
  configs: Partial<BootstrapConfigs>;
}
