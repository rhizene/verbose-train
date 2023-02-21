import axios from "axios";
import { updateCertificateBegin, updateCertificateFailure } from "Components/Home/Certification/CertificationSlice";
import updateCertificateSuccess from "./fetchCertificates";

export default function updateCertificate(certificate){
    return dispatch => {
        dispatch(updateCertificateBegin());
        return axios({
            method: 'put',
            url: '/certification',
            data: certificate,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() =>dispatch(updateCertificateSuccess()) )
        .catch(errors=>{
            console.error({message: 'update certificate failed', errors});
            dispatch(updateCertificateFailure());
        })
    }    
}
