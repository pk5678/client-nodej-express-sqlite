import {useEffect, useState} from "react";

const API_SERVER = process.env.REACT_APP_API_SERVER || "http://localhost:5007";

export default function ListUser() {
    const [userList, setUserList] = useState([]);
    const [message, setMessage] = useState(null);

    async function fetchAllUsers() {
        const res = await fetch(`${API_SERVER}/user`);
        if(res) {
            const result = await res.json();
            console.log(result);
            setUserList(result);
        }
    }

    const search = async event => {
        event.preventDefault()
        setMessage(null);
        const searchText = document.getElementById("search-text").value;
        console.log(searchText)

        if (searchText.length > 0) {
            const params = searchText;
            console.log(params);
            const res = await fetch(`${API_SERVER}/search/` + params);
            if(res) {
                const result = await res.json();
                console.log(result);
                setUserList(result);
               setMessage(result.length === 0? 'No data found.':`${result.length} entries found`)
            }
        }
    }

    useEffect(() => {
        fetchAllUsers();

    }, [])

    return (
        <div>
            <form onSubmit={search} id={"search-form"} name={"search-form"}>
                <h3>Search User</h3>
                <input type={'text'} id={"search-text"} placeholder={"Provide user name or email"}/>
                <button onClick={search}>Search</button>
                {message && <h4>{message}</h4>}
            </form>
            <h3>Users </h3>
            <ol>
                {userList.map((user, index) => <li key={user.id}>User Name: <b>{user.userName}</b> {' '} Email: <b>{user.email}</b></li>)}
            </ol>
        </div>
    );
}