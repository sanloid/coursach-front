import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { authSlice } from '../store/reducers/authSlice';

export default function LogOut() {

    const disp = useAppDispatch();

    async function logout() {
        disp(authSlice.actions.logout());
    }

    return (
        <div className='p-2'>
            <button onClick={logout} className="hover:bg-red-300 border-2 rounded-xl border-red-100 p-2">log out</button>
        </div>
    )
}
