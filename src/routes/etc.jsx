import { Form, useRouteError } from "react-router-dom";

export default function Etc(){

    return (
        <div id="error-page">
            <h1>Etc</h1>
            <p>this is Etcππ</p>
            <div>
                <Form 
                method="post"
                action="../contacts/error/destory">
                <button type="submit">μλ¬ λ°μμν€κΈ°</button>                    
                </Form>
            </div>
        </div>
    );
}