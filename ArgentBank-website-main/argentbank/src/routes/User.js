import React, { useEffect, useState } from 'react';
import Account from './composants/Account';
import { useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const User = () => {

    const dispatch = useDispatch();
    const token = useSelector((state) => state?.token);
    const user = useSelector((state) => state?.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState(user?.userName);
    const navigate = useNavigate();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (!token){
            navigate('/sign-in');
        }
    }, [token]);

    const handleSave = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userName : username }),
          });
    
          if (response.ok) {
            dispatch({ type: 'updateUsername', payload: username });
            closeModal();
          } else {
            console.error('Échec de la mise à jour du pseudo');
          }
        } catch (error) {
          console.error('Erreur lors de l envoi des données', error);
        }
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    dispatch({ type: 'setUser', payload: data.body });
                } else {
                    alert('Utilisateur non connecté');
                }
            } catch (error) {
                alert('Erreur lors de la récupération des données : ' + error.message);
            }
        };

        if (token) {
            fetchUserProfile();
        }
    }, [token, dispatch]);

    useEffect(() => {
        setUsername(user.userName)
    }, [user]);

    return (
        <div>
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br/>{user ? `${user.firstName} ${user.lastName}` : 'User'} !</h1>
                    <button className="edit-button" onClick={openModal}> Edit Name</button>
                </div>
                <h2 className="sr-only">Accounts</h2>
                <Account title='Argent Bank Checking (x8349)' amount='$2,082.79' description='Available Balance'/>
                <Account title='Argent Bank Savings (x6712)' amount='$10,928.42' description='Available Balance'/>
                <Account title='Argent Bank Credit Card (x8349)' amount='$184.30' description='Current Balance'/>
            </main>

            <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Edit User" className="edit_modale">
                <h2>Edit User</h2>
                <form className="edit_user">
                    <div>
                        <label>Username : </label>
                        <input type="text" value={username || ''} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>First Name : </label>
                        <input type="text" value={user?.firstName} disabled />
                    </div>
                    <div>
                        <label>Last Name : </label>
                        <input type="text" value={user?.lastName} disabled />
                    </div>
                    <div className='edit_button'>
                        <button type="button" onClick={handleSave}>Save</button>
                        <button type="button" onClick={closeModal}>Cancel</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default User;