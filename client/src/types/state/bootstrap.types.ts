export interface PaywallPrice {
  priceId: string;
  name: string;
  amount: number;
  currency: string;
  interval: number;
  isDefault?: boolean;
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
