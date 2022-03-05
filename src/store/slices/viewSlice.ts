import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import ITeamData from "../../models/ITeamData";
import { IStaticDataset } from "../../models/static/IStaticDataset";

interface ViewState {
    currentTab?: string;
}

const initialState: ViewState = {
    currentTab: undefined,
};

export const viewSlice = createSlice({
    name: "view",
    initialState,
    reducers: {
        setCurrentTab: (state, action: PayloadAction<string | undefined>) => {
            state.currentTab = action.payload;
        },
    },
});

export const { setCurrentTab } = viewSlice.actions;

export const selectCurrentTab = (state: RootState) => state.view.currentTab;

const viewReducer = viewSlice.reducer;
export default viewReducer;
