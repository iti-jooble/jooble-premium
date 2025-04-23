import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PremiumInfo {
  isSubscribed: boolean;
  expireTimeUtc: string | null;
}

interface UserInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  premium: PremiumInfo;
}

const initialState: UserInfo = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  premium: {
    isSubscribed: false,
    expireTimeUtc: null
  }
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      return { ...state, ...action.payload };
    },
    setPremiumStatus: (state, action: PayloadAction<PremiumInfo>) => {
      state.premium = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.endsWith('/fulfilled') && action.meta?.arg?.endpointName === 'getConfigs',
      (state, action: PayloadAction<{ userInfo?: { premium: PremiumInfo } }>) => {
        if (action.payload?.userInfo?.premium) {
          state.premium = action.payload.userInfo.premium;
        }
      }
    );
  },
});

export const { setUserInfo, setPremiumStatus } = userInfoSlice.actions;
export default userInfoSlice.reducer; 