import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../components/general/Header';
import Button from '../components/ui/Button';
import InputText from '../components/ui/InputText';
import { auth, db } from '../firebase/firebase';
import {useNavigate, useParams} from 'react-router-dom'
import './ManageProfile.css'

export default function ManageProfile() {

    const [profileEditState,setProfileEditState] = useState(false)
    const [fieldDisable, setFieldDisabled] = useState(true)

    const {userid,usertype} = useParams(); 


    const [displayName,setDisplayName] = useState('');
    const [institute,setInstitute] = useState(null)
    const [branchDepartment, setBranchDepartment] = useState(null);
    const [instituteRollNumber,setInstituteRollNumber] = useState(null)
    const [userdata,setUserdata] = useState();

    const [user,loading,error] = useAuthState(auth);
    const navigate = useNavigate()

    useEffect(()=>{
        if(profileEditState){
            setFieldDisabled(false)
        }else{
            setFieldDisabled(true)
        }
    }, [profileEditState])



    useEffect(()=>{
        async function ReadData() {
            const docSnap = await getDoc(doc(db,'users',userid));
            setUserdata(docSnap.data().profile)
        }
        ReadData()
        
    }, [])

    const SaveHandler = async() => {
        if(usertype === 'Student')
        {
            if(institute.length === 0 || instituteRollNumber.length === 0 || branchDepartment.length === 0 ){
                toast.error('Fill All The Fields')
                return
            }
            else{
                await updateDoc(doc(db, 'users', userid),{
                    profile: {
                        name: userdata.name,
                        email: userdata.email,
                        institute: institute,
                        usertype: usertype,                    
                        instituteRollNumber : instituteRollNumber,
                        branchDepartment : branchDepartment}
                })
            }
        }
        if(usertype === 'Teacher'){
            if(institute.length === 0)
            {
                toast.error('Fill All The Fields')
                return
            }
            else{
                const suc = await updateDoc(doc(db, 'users', userid),{
                    profile: {
                        institute: institute,
                        usertype : usertype,
                        name: userdata.name,
                        email: userdata.email,
                    }
                })
                console.log('suc' ,suc,userid)
            }
        }

        
        
        setProfileEditState(false)
        toast.success('Profile Updated')
    }


  return (
    <div className='ProfileScreen'>
        <ToastContainer />
        <Header />
        <div className='ProfileBody'>
        <div className='ProfileSection'>
            <div>
                <img className='ProfilePhoto' src={user?.photoURL} />
                <div style={{backgroundColor: '#01082D', height: '35px', width: '35px', display: 'grid',placeItems: 'center', borderRadius: '50%'}}>
                    <FontAwesomeIcon icon={'fa-solid fa-pen'} color='#fff'  />
                </div>
                <div>{userdata?.name}</div>
            </div>
            <div>
                <table className='table'>
                    <tbody>
                    
                    <tr>
                        <td className='td'>Email Id</td>
                        <td>:</td>

                        <td> <InputText valid={true} disabled={true} val={userdata?.email} width={250} /> </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                        <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center',width: '100%'}}>
                            <Button text={'Change Password'} onclick={null} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='td'>Institute</td>
                        <td>:</td>

                        <td ><InputText valid={institute ? true : false} disabled={fieldDisable} val={institute ? institute: ''} width={250} onchange={(e) => setInstitute(e.target.value)}  /></td>
                        <td>  {!institute && <FontAwesomeIcon icon={`fa-solid fa-exclamation`} color='red' />} </td>
                    </tr>
                    {usertype === "Student" && <tr>
                        <td className='td'>Branch/ Department</td>
                        <td>:</td>

                        <td><InputText valid={branchDepartment ? true : false} disabled={fieldDisable} val={branchDepartment ? branchDepartment: ''} width={250} onchange={(e) => setBranchDepartment(e.target.value)}  /></td>
                        <td >  {!branchDepartment && <FontAwesomeIcon icon={`fa-solid fa-exclamation`} color='red' />} </td>
                    </tr>}
                    {usertype === "Student" && <tr>
                        <td className='td'>College Roll Number</td>
                        <td>:</td>
                        <td><InputText valid={instituteRollNumber ? true : false} disabled={fieldDisable} val={instituteRollNumber ? instituteRollNumber: ''} width={250} onchange={(e) => setInstituteRollNumber(e.target.value)}  /></td>
                        <td>  {!instituteRollNumber && <FontAwesomeIcon icon={`fa-solid fa-exclamation`} color='red' />} </td>
                    </tr>}
                    <tr>
                        <td colSpan={4} >
                            <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center',width: '100%'}}>
                            <Button text={'Back'} onclick={() => navigate(-1)} />
                            <Button text={profileEditState ? 'Save' : 'Edit'} onclick={profileEditState ? SaveHandler : () => setProfileEditState(true)} />
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    </div>
  )
}
