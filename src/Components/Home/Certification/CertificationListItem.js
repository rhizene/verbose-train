import createCertificate from 'Actions/createCertificate';
import updateCertificate from 'Actions/updateCertificate';
import CareerObjectiveStyle from 'Components/Home/CareerObjective.module.scss';
import { createRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCertificate, toggleEditCertificate } from "./CertificationSlice";


export default function CertificationListItem({id}) {
    const dispatch = useDispatch();
    const dataList = useSelector(state => state.certification.data);
    const isOthersEditing = dataList.findIndex(data => data.id !== id && data.isEditing) !== -1;
    const certification = dataList.find(data => data.id === id);
    const {isEditing} = certification;

    const fields = {
        name: certification.name,
        from: certification.from,
        to: certification.to,
        description: certification.description,
        reason: certification.reason
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
        const saveAction = (id === null)
            ?  createCertificate({
                name:        nameFieldRef.current.innerText,
                from:        fromFieldRef.current.innerText,
                to:          toFieldRef.current.innerText,
                description: descriptionFieldRef.current.innerText,
                reason:      reasonFieldRef.current.innerText,
            })
            : updateCertificate({
                id,
                name:        nameFieldRef.current.innerText,
                from:        fromFieldRef.current.innerText,
                to:          toFieldRef.current.innerText,
                description: descriptionFieldRef.current.innerText,
                reason:      reasonFieldRef.current.innerText,
            })
        
        dispatch(saveAction);
        dispatch(toggleEditCertificate({id, isEditing: false}));
    }

    function closeEdit(){
        dispatch(toggleEditCertificate({id, isEditing: false}));
        resetListItem();
    }

    function resetListItem(){
        nameFieldRef.current.innerText = certification.name;
        fromFieldRef.current.innerText = certification.from;
        toFieldRef.current.innerText = certification.to;
        descriptionFieldRef.current.innerText = certification.description;
        reasonFieldRef.current.innerText = certification.reason;
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

    return <div key={fields.id}>
    
    {actionButtons}
    <div>
        <dt ref={nameFieldRef} contentEditable={isEditing}>{fields.name}</dt>
        <sup><div className={CareerObjectiveStyle.dateField+' '+CareerObjectiveStyle.textRight} ref={fromFieldRef} contentEditable={isEditing}>{fields.from}</div>&nbsp;-&nbsp;<div className={CareerObjectiveStyle.dateField} ref={toFieldRef} contentEditable={isEditing}>{fields.to}</div></sup>
        <div >Description:</div>
        <dd ref={descriptionFieldRef} contentEditable={isEditing}>{fields.description}</dd>
        <div >Reason:</div>
        <dd ref={reasonFieldRef} contentEditable={isEditing}>{fields.reason}</dd>
    </div>
</div>  
}
