import React, { useState, useEffect } from 'react';
import { BasicModal } from '../../components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
//import axios from "axios";


const EditKeywordModal = ({ open, onClose, updateKeywordDetails, defaultText }) => {

    const defaultInputValues = {
        name: defaultText
    };
    
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
        name: Yup.string()
            .required('Name is required'),
       
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const editKeyword = (data) => {
        updateKeywordDetails(data);
    };

    const handleChange = (value) => {
        //value.preventDefault();
        setValues(value)
    };

    useEffect(() => {
        if (open) setValues(defaultInputValues);
    }, [open])

    const getContent = () => (
        <Box sx={modalStyles.inputFields}>
            <TextField
                placeholder="Keyword"
                name="name"
                label="Keyword"
                variant="filled"
                required
                {...register('name')}
                error={errors.name ? true : false}
                helperText={errors.name?.message}
                value={values.name}
                onChange={(event) => handleChange({ ...values, name: event.target.value })}
            />
            
        </Box>
    );
    
    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="Edit Keyword"
            subTitle="Edit keyword and hit the 'submit' button."
            content={getContent()}
            onSubmit={handleSubmit(editKeyword)}
        />
            
    )
}

export default EditKeywordModal;