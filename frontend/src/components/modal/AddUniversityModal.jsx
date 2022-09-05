import React, { useState, useEffect } from 'react';
import { BasicModal } from '../../components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
//import axios from "axios";


const defaultInputValues = {
    full_name: '',
    twitter_name: '',
    twitter_handle: '',
    twitter_avi_link: ''
};

const AddUniversityModal = ({ open, onClose, addNewUniversity }) => {

    const [values, setValues] = useState(defaultInputValues);

    const modalStyles = {
        inputFields: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
            marginBottom: '15px',
            '.MuiFormControl-root': {
                marginBottom: '20px',
            },
        },
    };

    //const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = Yup.object().shape({
        full_name: Yup.string()
            .required('Full name is required'),
        twitter_name: Yup.string()
            .required('Twitter name is required'),
        twitter_handle: Yup.string()
            .required('Twitter handle is required; include the @ symbol'),
        twitter_avi_link: Yup.string()
            .required('Twitter profile picture link is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const addUniversity = (data) => {
        addNewUniversity(data);
        //console.log(data)
    };

    const handleChange = (value) => {
        setValues(value);
    };

    useEffect(() => {
        if (open) setValues(defaultInputValues);
    }, [open])

    const getContent = () => (
        <Box sx={modalStyles.inputFields}>
            <TextField
                placeholder="Full Name"
                name="full_name"
                label="Full Name"
                required
                {...register('full_name')}
                error={errors.full_name ? true : false}
                helperText={errors.full_name?.message}
                value={values.full_name}
                onChange={(event) => handleChange({ ...values, full_name: event.target.value })}
            />
            <TextField
                placeholder="Twitter Name"
                name="twitter_name"
                label="Twitter Name"
                required
                {...register('twitter_name')}
                error={errors.twitter_name ? true : false}
                helperText={errors.twitter_name?.message}
                value={values.twitter_name}
                onChange={(event) => handleChange({ ...values, twitter_name: event.target.value })}
            />
            <TextField
                placeholder="Twitter Handle"
                name="twitter_handle"
                label="Twitter Handle"
                required
                {...register('twitter_handle')}
                error={errors.twitter_handle ? true : false}
                helperText={errors.twitter_handle?.message}
                value={values.twitter_handle}
                onChange={(event) => handleChange({ ...values, twitter_handle: event.target.value })}
            />
            <TextField
                placeholder="Twitter Avi Link"
                name="twitter_avi_link"
                label="Twitter Avi Link"
                required
                {...register('twitter_avi_link')}
                error={errors.twitter_avi_link ? true : false}
                helperText={errors.twitter_avi_link?.message}
                value={values.twitter_avi_link}
                onChange={(event) => handleChange({ ...values, twitter_avi_link: event.target.value })}
            />
        </Box>
    );
    
    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="New University"
            subTitle="Fill out the University details and hit the 'submit' button."
            content={getContent()}
            onSubmit={handleSubmit(addUniversity)}
        />
            
    )
}

export default AddUniversityModal;