import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getServices } from '../../actions/services';
import Services from './components/services_user/services';

const AvailableServices = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getServices());
    }, [dispatch]);

    return (
        <>
            <Services />
        </>
    )
}

export default AvailableServices;
