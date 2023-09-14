import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './MySchedule.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MySchedule = () => {
    const [openAppointments, setOpenAppointments] = useState([]);
    const [canceledAppointments, setCanceledAppointments] = useState([]);
    const user = useSelector((state) => state.user);
    const userId = user.id;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`https://serverwellnestclinic.onrender.com/appointment/byUser/?userId=${userId}`);
                if (Array.isArray(response.data)) {

                    const open = response.data.filter(appointment => appointment.Status_Appointment.status === 'open');
                    const canceled = response.data.filter(appointment => appointment.Status_Appointment.status === 'cancel');
                    
                    setOpenAppointments(open);
                    setCanceledAppointments(canceled);
                } else {
                    setOpenAppointments([]);
                    setCanceledAppointments([]);
                }
            } catch (error) {
                console.error('Error al obtener las citas médicas:', error);
            }
        };

        fetchAppointments();
    }, [userId]);

    const handleCancelSchedule = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas cancelar esta cita?');

        if (confirmDelete) {
            try {
                await axios.delete(`https://serverwellnestclinic.onrender.com/appointment/${id}`);

                const updatedCanceledAppointments = canceledAppointments.filter(item => item.id !== id);
                setCanceledAppointments(updatedCanceledAppointments);
                navigate("/home")
            } catch (error) {
                console.error('Error al cancelar la cita médica:', error);
            }
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>My Schedule</h2>
            {openAppointments.length === 0 && canceledAppointments.length === 0 ? (
                <div className={styles.containerSection}>
                    <p className={styles.noAppointments}>You don't have any scheduled appointments</p>
                </div>
            ) : (
                <div className={styles.containerSection}>
                    {openAppointments.length > 0 && (
                        <div>
                            <h3>Open Appointments</h3>
                            <ul className={styles.scheduleList}>
                                {openAppointments.map(appointment => (
                                    <li key={appointment.id} className={styles.appointment}>
                                        <span className={styles.date}>{appointment.date}</span>
                                        <span className={styles.time}>{appointment.startTime}</span>
                                        <span className={styles.doctor}>
                                            {`${appointment.Appointment_Doctor.name} ${appointment.Appointment_Doctor.lastName}`}
                                        </span>
                                        <span className={styles.specialty}>{appointment.Appointment_Speciality.name}</span>
                                        <button
                                            className={styles['cancel-button']}
                                            onClick={() => handleCancelSchedule(appointment.id)}
                                        >
                                            Cancel appointment
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {canceledAppointments.length > 0 && (
                        <div>
                            <h3>Canceled Appointments</h3>
                            <ul className={styles.scheduleList}>
                                {canceledAppointments.map(appointment => (
                                    <li key={appointment.id} className={styles.appointment}>
                                        <span className={styles.date}>{appointment.date}</span>
                                        <span className={styles.time}>{appointment.startTime}</span>
                                        <span className={styles.doctor}>
                                            {`${appointment.Appointment_Doctor.name} ${appointment.Appointment_Doctor.lastName}`}
                                        </span>
                                        <span className={styles.specialty}>{appointment.Appointment_Speciality.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            <div className={styles.buttons}>
                <Link to="/makeAppointment" className={styles.newScheduleButton}>
                    Make a new appointment
                </Link>

                <Link to="/home" className={styles.newScheduleButton}>
                    Back to home
                </Link>
            </div>
        </div>
    );
};

export default MySchedule;
