import axios from "axios";
import { fetchCertificatesBegin, fetchCertificatesFailure, fetchCertificatesSuccess } from "Components/Home/Certification/CertificationSlice";

export default function fetchCertificates(){
    return dispatch => {
        dispatch(fetchCertificatesBegin());
        return axios.get('/certification')
            .then(response => {
                const certifications = response.data.map(certification => (
                    {
                        ...certification,
                        isEditing: false,
                    }
                    ))
                    setTimeout(()=>dispatch(fetchCertificatesSuccess({certifications})), 800);
            })
            .catch(errors=>{
                console.error({message: 'fetching certificates failed', errors});
                dispatch(fetchCertificatesFailure());
            })
    }
}

