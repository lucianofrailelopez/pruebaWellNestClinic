import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "../LandingPage/LandingPage.module.css"
import { useDispatch, useSelector } from "react-redux";
import { verifyIsMember, resetGenericError, resetIsMember } from "../../redux/action/actions";

//Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const genericError = useSelector((state) => state.genericError);
    const ResponseVerifyIsMember = useSelector((state) => state.verifyIsMember);

    const [cedula, setCedula] = useState('');

    const handleCedulaChange = (event) => {
        setCedula(event.target.value);
    };
    const handleCheckUser = async () => {
        dispatch(verifyIsMember(cedula));
        /* try {

            const response = await axios.get(`https://serverwellnestclinic.onrender.com/userClient/isMember/${cedula}`);
            if (response.status === 200) {
                navigate('/signup');
            }
        } catch (error) {
            window.alert(error.response.data.response);
            setErrorMessage('Ocurrió un error al validar el usuario.');
        } */
    };

    //toast message
    const messageError = (message) => {
        dispatch(resetGenericError());
        toast.error(message, {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        })

    };

    const messageSuccess = (message) => {
        dispatch(resetGenericError())
        toast.success(message, {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

    };

    const BtnResetIsMember = () => {
        dispatch(resetIsMember());
    };
    const toRegister = () => {
        navigate('/sign-up');
    }

    useEffect(() => {

    })

    return (
        <div className={styles.container}>
            {!ResponseVerifyIsMember && <div className={styles.containerSection}>
                <h2>Validate your ID to continue:</h2>
                <div className={styles.checkInputs}>
                    <input
                        type="text"
                        placeholder="Enter your ID"
                        value={cedula}
                        onChange={handleCedulaChange}
                        id={styles.CheckInptTex}

                    />
                    <button id={styles.CheckInptTexBtn} onClick={handleCheckUser}>Validate User</button>
                </div>
            </div>}
            {ResponseVerifyIsMember && <div className={styles.containerSection}>
                <h2>Greetings {ResponseVerifyIsMember.name} {ResponseVerifyIsMember.lastName} </h2>
                <div className={styles.checkInputs}>
                    <button id={styles.CheckInptTexBtn} onClick={BtnResetIsMember}>Cancel</button>
                    <button id={styles.CheckInptTexBtn} onClick={toRegister}>Continue</button>
                </div>
            </div>}
            {genericError && genericError.status === 403 ? messageError(genericError.response) : ''}´

            <div className={styles.containerSection}>
                <p className={styles.contactInfo}>
                    Address: 123 Main Street, City, Country<br />
                    Phone: (123) 456-7890<br />
                    Email: contact@wellnestclinic.com
                </p>
            </div>
            <ToastContainer></ToastContainer>
        </div>

    );
};

export default CheckUser;

