import * as Yup from 'yup';

const schema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email().required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    userType: Yup.string().required('User type is required'),
    address: Yup.string().required('Address is required'),
    passwordHash: Yup.string().required('Password is required'),
    city: Yup.string().required('City is required'),
})

export default schema;