import axios from "axios";
import { createCertificateBegin, createCertificateFailure } from "Components/Home/Certification/CertificationSlice";
import createCertificateSuccess from "./fetchCertificates";

export default function createCertificate(certificate){
    return dispatch => {
        dispatch(createCertificateBegin());
        return axios.post(
            '/certification',
            certificate,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response =>dispatch(createCertificateSuccess()) )
            .catch(errors=>{
                console.error({message: 'create certificate failed', errors});
                dispatch(createCertificateFailure());
            })
    }
}

