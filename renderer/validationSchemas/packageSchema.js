import * as Yup from 'yup';

const schema = Yup.object().shape({
    category: Yup.string().required('Category is required'),
    name: Yup.string().required('Name is required'),
    description: Yup.string(),
    timeUnit: Yup.string().required('Time unit is required'),
    duration: Yup.string(),
    numberOfSessions: Yup.number().required('Number of sessions is required'),
    price: Yup.number().required('Price is required'),
})

export default schema;