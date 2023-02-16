import { createSlice } from "@reduxjs/toolkit";
import resume from "Components/Home/resume";

export const certificationSlice = createSlice({
    name: 'certification',
    initialState: {
        data: [...resume.trainings.map(training => (
            {
                ...training,
                isEditing: false,
            }
            ))],
        index: resume.trainings.length
    },
    reducers: {
        appendCertificate: (state) => {
            const id = state.index + 1;
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
                    isEditing: true,
                }]
            };
            return newState;
        },
        toggleEditCertificate: (state, action) => {
            const {id, isEditing = false} = action.payload;

            const targetDataIndex = state.data.findIndex(data => data.id === id);
            const editedData = {
                ...state.data[targetDataIndex],
                isEditing
            };
            const newData = state.data.map(certificate => {
                return  (certificate.id === id) ? editedData : certificate;
            })
            const newState = {
                ...state,
                data: newData
            };
            return newState;

        },

        saveCertificate: (state, action) => {
            const updatedCertificate = action.payload;

            const editedData = {
                ...updatedCertificate,
                isEditing: false
            };
            const newData = state.data.map(certificate => {
                return  (certificate.id === updatedCertificate.id) ? editedData : certificate;
            })
            const newState = {
                ...state,
                data: newData
            };
            return newState;
        },

        removeCertificate: (state, action) => {
            const {id} = action.payload;
            const newData = state.data.filter(item => item.id !== id);
            const newState = {
                ...state,
                data: newData
            };
            return newState;
        },
    }
});

export const {appendCertificate, removeCertificate, toggleEditCertificate, saveCertificate,  } = certificationSlice.actions;
export default certificationSlice.reducer;
