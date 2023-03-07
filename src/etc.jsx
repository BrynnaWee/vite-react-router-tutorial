import { Form, useRouteError } from "react-router-dom";

export default function Etc(){

    return (
        <div id="error-page">
            <h1>Etc</h1>
            <p>this is Etc😁😁</p>
            <div>
                <Form 
                method="post"
                action="../contacts/error/destory">
                <button type="submit">에러 발생시키기</button>                    
                </Form>
            </div>
        </div>
    );
}