const API_SERVER = process.env.REACT_APP_API_SERVER || "http://localhost:5007";

export default function AddUser() {

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData(event.target);
        const formData = Object.fromEntries(form.entries());
        const res = await fetch(`${API_SERVER}/user`, {
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });

        const result = await res.json();
        if(result) {
            console.log(result);
            alert('User added to database');
        }
    };

    return(
        <form onSubmit={handleSubmit} id={"add-user-form"}>
            <h3>Add New User</h3>
            <span>User Name: </span> <br/>
            <input type={'text'} id={'userName'} name={'userName'} placeholder={'Provide user name'}/><br/>
            <span>Email: </span> <br/>
            <input type={'text'} id={'email'} name={'email'} placeholder={'Provide email id'}/><br/>
            <span>Password: </span> <br/>
            <input type={'password'} id={'password'} name={'password'} placeholder={'********'}/><br/>
            <button id={'submit'} type={'submit'}>Submit</button>
        </form>
    );
}