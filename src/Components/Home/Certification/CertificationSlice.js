import { createSlice } from "@reduxjs/toolkit";

export const certificationSlice = createSlice({
    name: 'certification',
    initialState: {
        data: [],
        isFetching: false,
    },
    reducers: {
        fetchCertificatesBegin: state => {
            return {
                ...state,
                isFetching: true,
            }
        },
        fetchCertificatesSuccess:  (state, {payload}) => {
            const {certifications} = payload;
            
            const data = certifications;

            const newState = {
                ...state,
                data,
                isFetching: false,
            };
            return newState;
        },
        fetchCertificatesFailure: (state)=>{
            return {
                ...state,
                isFetching: false,
            }
        },
        appendCertificate: (state) => {
            const newState = {
                ...state,
                data: [...state.data, {
                    id: null,
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

        createCertificateBegin: state=>{
            return {...state};
        },
        createCertificateFailure: state=>{
            return {...state};
        },
        updateCertificateBegin: state=>{
            return {...state};
        },
        updateCertificateFailure: state=>{
            return {...state};
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

export const {
    appendCertificate,
    removeCertificate,
    toggleEditCertificate,
    createCertificateBegin,
    createCertificateFailure,
    fetchCertificatesBegin,
    fetchCertificatesSuccess,
    fetchCertificatesFailure,
    updateCertificateBegin,
    updateCertificateFailure,
} = certificationSlice.actions;
export default certificationSlice.reducer;
