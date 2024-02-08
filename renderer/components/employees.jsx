import tableStyles from '../styles/Table.module.scss'
import styles from '../styles/EntityList.module.scss'
import { Table, Button, Modal, ModalDialog, ModalClose } from '@mui/joy';
import { useState, useEffect } from 'react';
import axios from 'axios';
import employeeSchema from '../validationSchemas/employeeSchema'
import Snackbar from '@mui/joy/Snackbar'
import { ErrorOutline, CheckCircleOutline } from '@mui/icons-material'

export default function Employees() {
    const [success, setSuccess] = useState({
        addEmployee: false,
        updateEmployee: false,
        deleteEmployee: false
    })
    const [error, setError] = useState(false)
    const [employees, setEmployees] = useState([])
    const [addEmployee, setAddEmployee] = useState(false)
    const [editEmployee, setEditEmployee] = useState(false)
    const [deleteEmployee, setDeleteEmployee] = useState(false)
    const [employeeDetails, setEmployeeDetails] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState({})
    const [employeeData, setEmployeeData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        userType: 'Employee',
        address: '',
        passwordHash: '',
        city: ''
    })

    useEffect(() => {
        axios.get('http://localhost:8000/employees/').then(res => {
            setEmployees(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const handleAddEmployee = () => {
        employeeSchema.validate(employeeData).then(() => {
            axios.post('http://localhost:8000/employees/addemployee', employeeData).then(res => {
                setEmployees([...employees, res.data])
                setAddEmployee(false)
                setSuccess({...success, addEmployee: true})
                setTimeout(() => {
                    setSuccess({...success, addEmployee: false})
                }, 5000)
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err.errors)
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 5000)
        })
    }

    const handleDeleteEmployee = () => {
        axios.delete(`http://localhost:8000/employees/delemployee/${selectedEmployee.id}`).then(res => {
            setEmployees(employees.filter(employee => employee.id !== selectedEmployee.id))
            setDeleteEmployee(false)
            setEmployeeDetails(false)
            setSuccess({...success, deleteEmployee: true})
            setTimeout(() => {
                setSuccess({...success, deleteEmployee: false})
            }, 5000)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleEditEmployee = () => {
        console.log(employeeData)
        employeeSchema.validate(employeeData).then(() => {
            axios.put(`http://localhost:8000/employees/updateemployee/${selectedEmployee.id}`, employeeData).then(res => {
                setEmployees(employees.map(employee => {
                    if(employee.id === selectedEmployee.id) {
                        return res.data
                    } else {
                        return employee
                    }
                }))
                setEditEmployee(false)
                setEmployeeDetails(false)
                setSuccess({...success, updateEmployee: true})
                setTimeout(() => {
                    setSuccess({...success, updateEmployee: false})
                }, 5000)
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 5000)
        })
    }

    return(
        <>
            <div className={styles.main}>
                <div className={tableStyles.tableContainer}>
                    <Table className={tableStyles.table} aria-label="basic table">
                        <thead>
                            <tr className={tableStyles.tableHead}>
                                <th style={{width: '10%'}} className={tableStyles.tableHeadItem}>Employee ID</th>
                                <th className={tableStyles.tableHeadItem}>First Name</th>
                                <th className={tableStyles.tableHeadItem}>Last Name</th>
                                <th className={tableStyles.tableHeadItem}>Email</th>
                                <th className={tableStyles.tableHeadItem}>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody className={tableStyles.tableBody}>
                            {
                                employees.map(employee => {
                                    return(
                                        <tr key={employee.id} onClick={() => {setSelectedEmployee(employee); setEmployeeDetails(true)}} className={tableStyles.tableEntry}>
                                            <td className={tableStyles.tableEntryText}>{employee.id}</td>
                                            <td className={tableStyles.tableEntryText}>{employee.firstName}</td>
                                            <td className={tableStyles.tableEntryText}>{employee.lastName}</td>
                                            <td className={tableStyles.tableEntryText}>{employee.email}</td>
                                            <td className={tableStyles.tableEntryText}>{employee.phoneNumber}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                <div className={styles.toolBar}>
                    <Button onClick={() => setAddEmployee(true)} className={styles.button}>Add Employee</Button>
                </div>
                <Modal open={addEmployee}>
                    <ModalDialog className={styles.modal}>
                        <ModalClose onClick={() => setAddEmployee(false)} />
                        <div className={styles.modalContent}>
                            <h1 className={styles.modalTitle}>Add Employee</h1>
                            <div className={styles.modalForm}>
                                <div className={styles.modalFormItem}>
                                    <label className={styles.modalFormItemLabel}>First Name</label>
                                    <input onChange={(e) => setEmployeeData({...employeeData, firstName: e.target.value})} type='text' className={styles.modalFormItemInput} />
                                </div>
                                <div className={styles.modalFormItem}>
                                    <label className={styles.modalFormItemLabel}>Last Name</label>
                                    <input onChange={(e) => setEmployeeData({...employeeData, lastName: e.target.value})} type='text' className={styles.modalFormItemInput} />
                                </div>
                                <div className={styles.modalFormItem}>
                                    <label className={styles.modalFormItemLabel}>Email</label>
                                    <input onChange={(e) => setEmployeeData({...employeeData, email: e.target.value})} type='email' className={styles.modalFormItemInput} />
                                </div>
                                <div className={styles.modalFormItem}>
                                    <label className={styles.modalFormItemLabel}>Phone Number</label>
                                    <input onChange={(e) => setEmployeeData({...employeeData, phoneNumber: e.target.value})} type='text' className={styles.modalFormItemInput} />
                                </div>
                                <div className={styles.modalFormItem}>
                                    <label className={styles.modalFormItemLabel}>User Type</label>
                                    <select onChange={(e) => setEmployeeData({...employeeData, userType: e.target.value})} type='text' className={styles.modalFormItemInput} >
                                        <option value='Employee'>Employee</option>
                                        <option value='Admin'>Admin</option>
                                    </select>
                                </div> 
                                <div className={styles.modalFormItem}>
                                    <label className={styles.modalFormItemLabel}>Address</label>
                                    <input onChange={(e) => setEmployeeData({...employeeData, address: e.target.value})} type='text' className={styles.modalFormItemInput} />
                                </div> 
                                <div className={styles.modalFormItem}>
                                    <label className={styles.modalFormItemLabel}>Password</label>
                                    <input onChange={(e) => setEmployeeData({...employeeData, passwordHash: e.target.value})} type='text' className={styles.modalFormItemInput} />
                                </div> 
                                <div className={styles.modalFormItem}>
                                    <label className={styles.modalFormItemLabel}>City</label>
                                    <input onChange={(e) => setEmployeeData({...employeeData, city: e.target.value})} type='text' className={styles.modalFormItemInput} />
                                </div> 
                            </div>
                            <Button onClick={handleAddEmployee}>
                                Add Employee
                            </Button>
                        </div>
                    </ModalDialog>
                </Modal>
                <Modal open={employeeDetails}>
                    <ModalDialog className={styles.modal} style={{width: '80%'}}>
                        <ModalClose onClick={() => setEmployeeDetails(false)} />
                        <div className={styles.modalContent}>
                            <h1 className={styles.modalTitle}>Employee Details</h1>
                            <div style={{flexDirection: 'row', display: 'flex'}} className={styles.modalDetails}>
                                <div className={styles.modalDetails}>
                                    <p className={styles.modalDetailItem}><strong style={{color: 'white'}}>First Name: </strong>{selectedEmployee.firstName}</p>
                                    <p className={styles.modalDetailItem}><strong style={{color: 'white'}}>Last Name: </strong>{selectedEmployee.lastName}</p>
                                    <p className={styles.modalDetailItem}><strong style={{color: 'white'}}>Email: </strong>{selectedEmployee.email}</p>
                                    <p className={styles.modalDetailItem}><strong style={{color: 'white'}}>Phone Number: </strong>{selectedEmployee.phoneNumber}</p>
                                    <p className={styles.modalDetailItem}><strong style={{color: 'white'}}>User Type: </strong>{selectedEmployee.userType}</p>
                                    <p className={styles.modalDetailItem}><strong style={{color: 'white'}}>Address: </strong>{selectedEmployee.address}</p>
                                    <p className={styles.modalDetailItem}><strong style={{color: 'white'}}>City: </strong>{selectedEmployee.city}</p>
                                </div>
                            </div>
                            <div className={styles.buttonGroup}>
                                <Button onClick={() => {setEditEmployee(true); setEmployeeData(selectedEmployee)}} className={styles.button}>Edit Employee</Button>
                                <Button onClick={() => setDeleteEmployee(true)} color='danger' className={styles.button}>Delete Employee</Button>
                            </div>
                        </div>
                    </ModalDialog>
                </Modal>
                <Modal open={deleteEmployee}>
                    <ModalDialog className={styles.modal}>
                        <ModalClose onClick={() => setDeleteEmployee(false)} />
                        <div className={styles.modalContent}>
                            <h1 className={styles.modalTitle}>Delete Employee</h1>
                            <p className={styles.modalText}>Are you sure you want to delete this employee?</p>
                            <div className={styles.buttonGroup}>
                                <Button onClick={handleDeleteEmployee} color='danger' className={styles.button}>Delete</Button>
                                <Button onClick={() => setDeleteEmployee(false)} className={styles.button}>Cancel</Button>
                            </div>
                        </div>
                    </ModalDialog>
                </Modal>
                <Modal open={editEmployee}>
                    <ModalDialog className={styles.modal}>
                        <ModalClose onClick={() => setEditEmployee(false)} />
                        <div className={styles.modalContent}>
                            <h1 className={styles.modalTitle}>Edit Employee</h1>
                            <div className={styles.modalForm}>
                                <div className={styles.modalFormItem}>
                                    <label className={styles.modalFormItemLabel}>First Name</label>
                                    <input value={employeeData.firstName} onChange={(e) => setEmployeeData({...employeeData, firstName: e.target.value})} type='text' className={styles.modalFormItemInput} />
                                </div>
                                <div className={styles.modalFormItem}>
                                    <label className={styles.modalFormItemLabel}>Last Name</label>
                                    <input value={employeeData.lastName} onChange={(e) => setEmployeeData({...employeeData, lastName: e.target.value})} type='text' className={styles.modalFormItemInput} />
                                </div>
                                <div className={styles.modalFormItem}>
                                    <label className={styles.modalFormItemLabel}>Email</label>
                                    <input value={employeeData.email} onChange={(e) => setEmployeeData({...employeeData, email: e.target.value})} type='email' className={styles.modalFormItemInput} />
                                </div>
                                <div className={styles.modalFormItem}>
                                    <label className={styles.modalFormItemLabel}>Phone Number</label>
                                    <input value={employeeData.phoneNumber} onChange={(e) => setEmployeeData({...employeeData, phoneNumber: e.target.value})} type='text' className={styles.modalFormItemInput} />
                                </div>
                                <div className={styles.modalFormItem}>
                                    <label className={styles.modalFormItemLabel}>User Type</label>
                                    <select value={employeeData.userType} onChange={(e) => setEmployeeData({...employeeData, userType: e.target.value})} type='text' className={styles.modalFormItemInput} >
                                        <option value='Employee'>Employee</option>
                                        <option value='Admin'>Admin</option>
                                    </select>
                                </div> 
                                <div className={styles.modalFormItem}>
                                    <label className={styles.modalFormItemLabel}>Address</label>
                                    <input value={employeeData.address} onChange={(e) => setEmployeeData({...employeeData, address: e.target.value})} type='text' className={styles.modalFormItemInput} />
                                </div> 
                                <div className={styles.modalFormItem}>
                                    <label className={styles.modalFormItemLabel}>Password</label>
                                    <input onChange={(e) => setEmployeeData({...employeeData, passwordHash: e.target.value})} type='text' className={styles.modalFormItemInput} />
                                </div> 
                                <div className={styles.modalFormItem}>
                                    <label className={styles.modalFormItemLabel}>City</label>
                                    <input value={employeeData.city} onChange={(e) => setEmployeeData({...employeeData, city: e.target.value})} type='text' className={styles.modalFormItemInput} />
                                </div> 
                            </div>
                            <Button onClick={handleEditEmployee}>
                                Edit Employee
                            </Button>
                        </div>
                    </ModalDialog>
                </Modal>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={error}
                color='danger'
                variant='solid'
            >
                <ErrorOutline />
                Please fill out the form!
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={success.addEmployee}
                color='success'
                variant='solid'
            >
                <CheckCircleOutline />
                Successfully Created an Employee!
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={success.deleteEmployee}
                color='success'
                variant='solid'
            >
                <CheckCircleOutline />
                Successfully Removed an Employee!
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={success.updateEmployee}
                color='success'
                variant='solid'
            >
                <CheckCircleOutline />
                Saved Changes Successfully!
            </Snackbar>
        </>
    )
}