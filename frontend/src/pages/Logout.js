import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/Auth";
// alert
import swal from 'sweetalert';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        swal("Success", "You have successfully logout!", "success");
        navigate('/account');
    }, [navigate]);

    return null;
}
