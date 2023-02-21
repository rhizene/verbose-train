import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CareerObjectiveStyle from 'Components/Home/CareerObjective.module.scss';
import { useDispatch, useSelector } from "react-redux";
import CertificationListItem from './CertificationListItem';
import { appendCertificate } from "./CertificationSlice";



export default function Certification() {
    const dispatch = useDispatch();
    const certificationData = useSelector(state => state.certification.data);
    const dataList = useSelector(state => state.certification.data);
    const isEditing = dataList.findIndex(data => data.isEditing) != -1;
    const isFetchingData = useSelector(state => state.certification.isFetching);

    function appendItem(){
        dispatch(appendCertificate());
    }

    function renderCertifications(){
        if(!certificationData) {
            return <h3>No available certifications</h3>
        }
        return <dl>{
            certificationData.map(certification => 
                <CertificationListItem key={certification.id} id={certification.id} />
                )
                }</dl>;
    }

    return <section className={CareerObjectiveStyle.objective}>
        <h2>Certifications</h2>
        <button disabled={isEditing} onClick={()=>appendItem()}><FontAwesomeIcon icon={faPlus} /> </button>
        <hr/>
        {
            isFetchingData ? 
                <div className={CareerObjectiveStyle.loaderContainer}><FontAwesomeIcon  icon={faSpinner} /></div>
                : null
        }
        
        {renderCertifications()}
    </section>
}
