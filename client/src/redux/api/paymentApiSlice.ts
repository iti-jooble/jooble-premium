import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CreateCheckoutSessionRequest {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

interface CreateCheckoutSessionResponse {
  redirectUrl: string;
}

interface CreateCustomerPortalRequest {
  returnUrl: string;
}

interface CreateCustomerPortalResponse {
  redirectUrl: string;
}

export const paymentApiSlice = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation<CreateCheckoutSessionResponse, CreateCheckoutSessionRequest>({
      query: (data) => ({
        url: "payment/createcheckoutsession",
        method: "POST",
        body: data,
      }),
    }),
    createCustomerPortal: builder.mutation<CreateCustomerPortalResponse, CreateCustomerPortalRequest>({
      query: (data) => ({
        url: "payment/customerPortal",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { 
  useCreateCheckoutSessionMutation,
  useCreateCustomerPortalMutation 
} = paymentApiSlice; 