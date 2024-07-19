import { useEffect, useState } from "react"
import { UserDetailsApi } from "../services/Api";
import { isAuthenticated } from "../services/Auth";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        localId: ''
    });

   
    if(isAuthenticated()){
        useEffect( ()=> {
            UserDetailsApi().then((res)=> {
                setUser({name:res.data.users[0].displayName, 
                    email:res.data.users[0].email,
                    localId:res.data.users[0].localId,
                })
            })
            
        },[])
    return (
        <>
            <h1>Dashboard page</h1>
            {user.name && user.email && user.localId ?
                (
                    <div>
                        <h5>Name: {user.name} </h5>
                        <h5>email: {user.email}</h5>
                        <h5>localid: {user.localId}</h5>
                    </div>
                )
                :
                <p>Loading...</p>
            }

        </>

    )
}else{
    return(
        <>
        <Navigate to='/account'/>
        </>
    )
}
}