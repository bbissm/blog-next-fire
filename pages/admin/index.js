import AuthCheck from "../../components/AuthCheck";

export default () => {
    return (
        <main>
            <AuthCheck>
                <h1>This is an Adminpage</h1>
                <p>Here you are allowed to add and edit Posts</p>
            </AuthCheck>
        </main>
    );
}