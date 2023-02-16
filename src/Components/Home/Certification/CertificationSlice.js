import { createSlice } from "@reduxjs/toolkit";
import resume from "Components/Home/resume";

export const certificationSlice = createSlice({
    name: 'certification',
    initialState: {
        data: [...resume.trainings],
        index: resume.trainings.length
    },
    reducers: {
        append: (state) => {
            const id = state.data.item + 1;
            const newState = {
                ...state,
                index: id,
                data: [...state.data, {
                    id,
                    name: '',
                    description: '',
                    reason: '',
                    from: '',
                    to: '',
                }]
            };
            return newState;
        },
        remove: (state, action) => {
            const newData = state.data.filter(item => item.id !== action.id);
            const newState = {
                ...state,
                data: newData
            };
            return newState;
        },
    }
});

export const {append, remove} = certificationSlice.actions;
export default certificationSlice.reducer;
