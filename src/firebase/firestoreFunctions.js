import { doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"

async function FetchTestData(testid){
    try{
        const testdata = await getDoc(doc(db,'testDetails',testid))
        const data = testdata.data()
        return data
    }
    catch(e){
        console.log('error occure',e)
        return e
    }
}
async function FetchUserTestData(userid,testid){
    try {
        const testdata = await getDoc(doc(db,'users',userid))
        const data = testdata.data().tests.filter(test => test.testid === testid) 
        return data[0]
    }catch(e){
        return e
    }   
}


export {FetchTestData,FetchUserTestData}