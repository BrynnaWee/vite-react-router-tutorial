import { redirect } from 'react-router-dom';
import { deleteContact } from '../contacts';

// export async function action({params}){
//     console.log({params});
//     await deleteContact(params.contactId);
//     return redirect('/');
// }

export async function action(obj){
    console.log(obj);
}
