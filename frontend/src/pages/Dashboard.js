import { useEffect, useState } from "react";
import { UserDetailsApi } from "../services/Api";
import { isAuthenticated } from "../services/Auth";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        localId: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated()) {
            UserDetailsApi().then((res) => {
                setUser({
                    name: res.data.users[0].displayName,
                    email: res.data.users[0].email,
                    localId: res.data.users[0].localId,
                });
                setLoading(false);
            });
        } else {
            setLoading(false); // Set loading to false if not authenticated
        }
    }, []);

    if (!isAuthenticated()) {
        return <Navigate to='/account' />;
    }

    return (
        <>
            <h1>Dashboard page</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h5>Name: {user.name} </h5>
                    <h5>Email: {user.email}</h5>
                    <h5>Local ID: {user.localId}</h5>
                </div>
            )}
        </>
    );
}
