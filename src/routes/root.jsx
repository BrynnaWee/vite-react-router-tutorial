import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation } from 'react-router-dom';
import { getContacts, createContact } from '../contacts';

export async function loader(){
    const contacts = await getContacts();
    console.log('root loader');
    return {contacts}
}

export async function action(){
    const contact = await createContact();
    //생성한 contact의 edit페이지로 이동
    return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root(){

    const { contacts } = useLoaderData();
    const navigation = useNavigation();

    return (
        <>
        <div id="sidebar">
            <h1>router contacts</h1>
            <div>
                <form id="search-form" role="search">
                    <input 
                        id="q"
                        aria-label="Search contacts"
                        placeholder="Search"
                        type="search"
                        name="q"
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
                </form>
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
                                    {contacts.facorite&&<span>★</span>}
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