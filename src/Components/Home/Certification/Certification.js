import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { append, remove } from "./CertificationSlice";
import CareerObjectiveStyle from 'Components/Home/CareerObjective.module.scss'



export default function Certification() {
    const dispatch = useDispatch();
    const certificationData = useSelector(state => state.certification.data);

    function appendItem(){
        dispatch(append());
    }

    function deleteItem(id){
        dispatch(remove({id}));
    }

    function getCertifications(){
            return <dl>{
                certificationData.map(certification => 
                    <div key={certification.id}>
                        <div>
                            <button>Edit</button>
                            <button onClick={()=>deleteItem(certification.id)}>Delete</button>
                        </div>
                        <div>
                            <dt>{certification.name}</dt>
                            <sup>{certification.from} - {certification.to}</sup>
                            <div>Description:</div>
                            <dd>{certification.description}</dd>
                            <div>Reason:</div>
                            <dd>{certification.reason}</dd>
                        </div>
                    </div>  
                    )
                }</dl>;
    }

    return <section className={CareerObjectiveStyle.objective}>
        <h2>Certifications</h2><button onClick={()=>appendItem()}>Add</button>
        <hr/>
        {getCertifications()}
    </section>
}
