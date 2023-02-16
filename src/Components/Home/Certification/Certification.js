import CareerObjectiveStyle from 'Components/Home/CareerObjective.module.scss';
import { useDispatch, useSelector } from "react-redux";
import CertificationListItem from './CertificationListItem';
import { appendCertificate } from "./CertificationSlice";



export default function Certification() {
    const dispatch = useDispatch();
    const certificationData = useSelector(state => state.certification.data);
    const dataList = useSelector(state => state.certification.data);
    const isEditing = dataList.findIndex(data => data.isEditing) != -1;

    function appendItem(){
        dispatch(appendCertificate());

    }

    function getCertifications(){
            return <dl>{
                certificationData.map(certification => 
                    <CertificationListItem key={certification.id} id={certification.id} />
                    )
                }</dl>;
    }

    return <section className={CareerObjectiveStyle.objective}>
        <h2>Certifications</h2><button disabled={isEditing} onClick={()=>appendItem()}>Add</button>
        <hr/>
        {getCertifications()}
    </section>
}
