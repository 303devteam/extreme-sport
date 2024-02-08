import * as Yup from 'yup';

const schema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    birthDay: Yup.date().required('Birth day is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
})

export default schema;