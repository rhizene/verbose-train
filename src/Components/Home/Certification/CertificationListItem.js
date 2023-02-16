import React, { createRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditCertificate, removeCertificate, saveCertificate } from "./CertificationSlice";
import CareerObjectiveStyle from 'Components/Home/CareerObjective.module.scss';


export default function CertificationListItem({id}) {
    const dispatch = useDispatch();
    const dataList = useSelector(state => state.certification.data);
    const isOthersEditing = dataList.findIndex(data => data.id !== id && data.isEditing) != -1;
    const certification = dataList.find(data => data.id === id);
    const {isEditing} = certification;

    const [name, setName]                = useState(certification.name);
    const [from, setFrom]                = useState(certification.from);
    const [to, setTo]                    = useState(certification.to);
    const [description, setDescription]  = useState(certification.description);
    const [reason, setReason]            = useState(certification.reason);

    const fields = {
        name,
        from,
        to,
        description,
        reason
    }
    const nameFieldRef = createRef();
    const fromFieldRef = createRef();
    const toFieldRef = createRef();
    const descriptionFieldRef = createRef();
    const reasonFieldRef = createRef();

    useEffect(()=>{
        if(isEditing) {
            nameFieldRef?.current?.scrollIntoView?.({behavior: 'smooth'});
            setTimeout(()=>nameFieldRef?.current?.focus?.(), 500);
        }
    });

    function deleteItem(){
        dispatch(removeCertificate({id}));
    }

    function editItem(){
        dispatch(toggleEditCertificate({id, isEditing: true}));        
    }

    function saveEdit(){
        dispatch(
            saveCertificate({
                id,
                name,
                from,
                to,
                description,
                reason,
            }));
        dispatch(toggleEditCertificate({id, isEditing: false}));
    }

    function closeEdit(){
        dispatch(toggleEditCertificate({id, isEditing: false}));
        resetListItem();
    }

    function resetListItem(){
        nameFieldRef.current.innerText = name;
        fromFieldRef.current.innerText = from;
        toFieldRef.current.innerText = to;
        descriptionFieldRef.current.innerText = description;
        reasonFieldRef.current.innerText = reason;
    }

    const actionButtons = isOthersEditing ? <div></div>
    : isEditing ?
        <div>
            <button onClick={()=>saveEdit()}>Save</button>
            <button onClick={()=>closeEdit()}>Cancel</button>
        </div>
        :
        <div>
            <button onClick={()=>editItem()}>Edit</button>
            <button onClick={()=>deleteItem()}>Delete</button>
        </div>

    return <div key={certification.id}>
    
    {actionButtons}
    <div>
        <dt ref={nameFieldRef} contentEditable={isEditing} onChange={e => setName(e.target.value)}>{fields.name}</dt>
        <sup><div className={CareerObjectiveStyle.dateField+' '+CareerObjectiveStyle.textRight} ref={fromFieldRef} contentEditable={isEditing} onChange={(e)=>setFrom(e.target.value)}>{fields.from}</div>&nbsp;-&nbsp;<div className={CareerObjectiveStyle.dateField} ref={toFieldRef} contentEditable={isEditing} onChange={(e)=>setTo(e.target.value)}>{fields.to}</div></sup>
        <div >Description:</div>
        <dd ref={descriptionFieldRef} contentEditable={isEditing} onChange={(e)=>setDescription(e.target.value)}>{fields.description}</dd>
        <div >Reason:</div>
        <dd ref={reasonFieldRef} contentEditable={isEditing} onChange={(e)=>setReason(e.target.value)}>{fields.reason}</dd>
    </div>
</div>  
}
