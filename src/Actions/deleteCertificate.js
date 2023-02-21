import axios from "axios";
import { deleteCertificateBegin, deleteCertificateFailure, deleteCertificateSuccess } from "Components/Home/Certification/CertificationSlice";

export default function deleteCertificate({id}){
    return dispatch => {
        dispatch(deleteCertificateBegin());
        return axios.delete(
            '/certification/'+id,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(() =>dispatch(deleteCertificateSuccess({id})) )
        .catch(errors=>{
            console.error({message: 'delete certificate failed', errors});
            dispatch(deleteCertificateFailure());
        })
    }    
}
