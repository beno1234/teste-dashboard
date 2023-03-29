import { combineReducers } from '@reduxjs/toolkit';
import themeReducer, { themeType } from './theme';

export interface RootState {
    theme: themeType;
}

const rootReducer = combineReducers<RootState>({
    theme: themeReducer,
});

export default rootReducer;