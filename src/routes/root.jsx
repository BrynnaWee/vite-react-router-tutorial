import { useEffect } from 'react';
import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation } from 'react-router-dom';
import { getContacts, createContact } from '../contacts';

export async function loader({request}){
    console.log('request',request);
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    const contacts = await getContacts(q);
    //루트경로가 기본이므로, search폼에서 엔터를 쳤을 때
    //다시 페이지가 로드되면서 현재 current경로 뒤에 쿼리가 붙는다.
    //이는 root컴포넌트에서 목록을 필터링하기 위해 사용되는 것으로
    //현재 contact페이지나 edit페이지를 보는 것과는 무관하다.
   // (서브페이지는 그대로 유지)
    return {contacts,q}
}

export async function action(){
    const contact = await createContact();
    //생성한 contact의 edit페이지로 이동
    return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root(){

    const { contacts, q } = useLoaderData();
    const navigation = useNavigation();

    useEffect(()=>{
        document.getElementById("q").value = q;
    },[q])

    return (
        <>
        <div id="sidebar">
            <h1>router contacts</h1>
            <div>
                <Form id="search-form" role="search">
                    <input 
                        id="q"
                        aria-label="Search contacts"
                        placeholder="Search"
                        type="search"
                        name="q"
                        defaultValue={q}
                    />
                    <div 
                        id="search-spinner"
                        aria-hidden
                        hidden={true}
                    />
                    <div 
                    className="sr-only"
                    aria-live="polite"
                    ></div>
                </Form>
                <Form method="post">
                    <button type="submit">New</button>
                </Form>
            </div>
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="etc">Etc</NavLink></li>
                    {contacts.length ? (contacts.map((contact)=>(
                            <li key={contact.id}>
                                <NavLink 
                                    to={`contacts/${contact.id}`}
                                    className={({isActive, isPending})=>
                                        isActive ? "active"
                                        :isPending? "pending" : ""
                                    }>
                                    {contact.first||contact.last?(
                                        <>
                                        {contact.first} {contact.last}
                                        </>
                                    ):(
                                        <i>No name</i>
                                    )}{" "}
                                    {contacts.favorite&&<span>★</span>}
                                </NavLink>
                            </li>
                        ))
                    ):(
                        <p><i>No contacts</i></p>
                    )}
                </ul>
            </nav>
        </div>
        <div 
            id="detail"
            className={navigation.state==="loading"?"loading":''}
        ><Outlet />
        </div>
        </>
    )
}