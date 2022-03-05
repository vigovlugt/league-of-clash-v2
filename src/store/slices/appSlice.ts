import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import ITeamData from "../../models/ITeamData";
import { IStaticDataset } from "../../models/static/IStaticDataset";

interface AppState {
    allyData?: ITeamData;
    enemyData?: ITeamData;
    staticDataset?: IStaticDataset;
}

const initialState: AppState = {
    allyData: undefined,
    enemyData: undefined,
    staticDataset: undefined,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAllyData: (state, action: PayloadAction<ITeamData>) => {
            state.allyData = action.payload;
        },
        setEnemyData: (state, action: PayloadAction<ITeamData>) => {
            state.enemyData = action.payload;
        },
        setStaticDataset: (state, action: PayloadAction<IStaticDataset>) => {
            state.staticDataset = action.payload;
        },
    },
});

export const { setAllyData, setEnemyData, setStaticDataset } = appSlice.actions;

export const selectAllyData = (state: RootState) => state.app.allyData;
export const selectEnemyData = (state: RootState) => state.app.enemyData;
export const selectStaticDataset = (state: RootState) =>
    state.app.staticDataset;

const appReducer = appSlice.reducer;
export default appReducer;
