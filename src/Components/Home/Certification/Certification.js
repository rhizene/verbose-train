import { faPlus, faRefresh, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fetchCertificates from 'Actions/fetchCertificates';
import CareerObjectiveStyle from 'Components/Home/CareerObjective.module.scss';
import { useDispatch, useSelector } from "react-redux";
import CertificationListItem from './CertificationListItem';
import { appendCertificate } from "./CertificationSlice";



export default function Certification() {
    const dispatch = useDispatch();
    const certificationData = useSelector(state => state.certification.data);
    const dataList = useSelector(state => state.certification.data);
    const isEditing = dataList.findIndex(data => data.isEditing) !== -1;
    const isFetchingData = useSelector(state => state.certification.isFetching);

    function appendItem(){
        dispatch(appendCertificate());
    }
    function refreshList(){
        dispatch(fetchCertificates());
    }

    function renderCertifications(){
        if(certificationData.length === 0) {
            return !isFetchingData ? <h3>No available certifications</h3>:null;
        }
        return <dl className={isFetchingData?CareerObjectiveStyle.disabled:null} >{
            certificationData.map(certification => 
                <CertificationListItem key={certification.id} id={certification.id} />
                )
                }</dl>;
    }

    return <section className={CareerObjectiveStyle.objective}>
        <div className={CareerObjectiveStyle.fixedTitle}>
            <h2>Certifications</h2>
            <button disabled={isEditing} onClick={()=>appendItem()}><FontAwesomeIcon icon={faPlus} /> </button>
            <button disabled={isEditing} onClick={()=>refreshList()}><FontAwesomeIcon icon={faRefresh} /> </button>
            <hr/>
        </div>
        <div className={CareerObjectiveStyle.spacer}>
        {
            isFetchingData ? 
                <div className={CareerObjectiveStyle.loaderContainer}><FontAwesomeIcon  icon={faSpinner} /></div>
                : null
        }
        </div>
        
        {renderCertifications()}
    </section>
}
