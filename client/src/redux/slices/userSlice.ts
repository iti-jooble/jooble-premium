import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for user state
interface UserState {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  token: string | null;
  isPremium: boolean;
  isAuthenticated: boolean;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
  };
}

// Define initial state
const initialState: UserState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  token: null,
  isPremium: false,
  isAuthenticated: false,
  preferences: {
    theme: 'system',
    language: 'en',
  },
};

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set the complete user profile
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    },
    
    // Action for user login
    login: (state, action: PayloadAction<{ token: string; user: Partial<UserState> }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.id = action.payload.user.id || null;
      state.email = action.payload.user.email || null;
      state.firstName = action.payload.user.firstName || null;
      state.lastName = action.payload.user.lastName || null;
      state.isPremium = action.payload.user.isPremium || false;
    },
    
    // Action for user logout
    logout: (state) => {
      // Reset user state to initial values except preferences
      const { preferences } = state;
      Object.assign(state, { ...initialState, preferences });
    },
    
    // Action to update preferences
    updatePreferences: (state, action: PayloadAction<Partial<UserState['preferences']>>) => {
      state.preferences = {
        ...state.preferences,
        ...action.payload,
      };
    },
    
    // Action to toggle premium status
    setPremiumStatus: (state, action: PayloadAction<boolean>) => {
      state.isPremium = action.payload;
    },
  },
});

// Export actions
export const { setUser, login, logout, updatePreferences, setPremiumStatus } = userSlice.actions;

// Export reducer
export default userSlice.reducer;