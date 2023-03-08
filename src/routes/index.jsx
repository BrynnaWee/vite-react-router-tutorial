export async function loader(){
    console.log('this is index loader');
    return null;
}

export default function Index(){
    return (
        <p id="zero-state">
            This is demo for React Router.
            <br />
            Check out{" "}
            <a href="https://reactrouter.com">
                the docs at reactrouter.com
            </a>
            .
        </p>
    );
}
