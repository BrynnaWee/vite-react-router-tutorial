import { redirect } from 'react-router-dom';
import { deleteContact } from '../contacts';


export async function action(obj){
    const {request, params} = obj;
    console.log('destroy action 내부 request', request);
    console.log('destroy action 내부 params', params);
    const result = await deleteContact(params.contactId);
    console.log('result',result);
    if(result){return redirect('/'); 
    }else{
        throw new Error('에러가 발생했습니다😱😱😱');
        return null;
    }
}
