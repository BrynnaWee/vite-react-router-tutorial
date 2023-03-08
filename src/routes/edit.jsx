import {
    Form,
    useLoaderData,
    redirect,
    useNavigate
  } from "react-router-dom";
  import { updateContact } from "../contacts";
  

  export async function action({ request, params }) {
    // console.log('request',request);
    const formData = await request.formData();
    // console.log('formData',formData);
    // const firstName = formData.get("first");
    // const lastName = formData.get("last");
    const updates = Object.fromEntries(formData);
    // console.log('updates',updates);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
  }

/*
원래는 여기도 loader가 들어가야하지만, 어차피 contact.jsx에서 같은 내용의 로더를 사용하고 있기 떄문에
main.jsx의 라우터 설정 부분에서 loader속성에 contact.jsx의 로더를 넣어주었다.
그 결과, edit컴포넌트가 렌더링 될 떄에도 contact.jsx의 로더함수가 실행된다.
*/

export default function EditContact(){
    const {contact} = useLoaderData();
    const navigate = useNavigate();

    return (
        <Form method="post" id="contact-form">
            <p>
                <span>Name</span>
                <input
                placeholder='First'
                aria-label='First name'
                type="text"
                name="first"
                defaultValue={contact.first}
                />
                <input
                    placeholder='Last'
                    aria-label='Last name'
                    type="text"
                    name="last"
                    defaultValue={contact.last}
                />
            </p>
            <label>
                <span>Twitter</span>
                <input
                    placeholder='@boski'
                    aria-label='twitter'
                    type="text"
                    name="twitter"
                    defaultValue={contact.twitter}
                />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                placeholder="https://example.com/avatar.jpg"
                aria-label="Avatar URL"
                type="text"
                name="avatar"
                defaultValue={contact.avatar}
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea
                name="notes"
                defaultValue={contact.notes}
                rows={6}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button type="button"
                onClick={()=>{navigate(-1);}}
                >Cancel</button>
            </p>
        </Form>
    )
}