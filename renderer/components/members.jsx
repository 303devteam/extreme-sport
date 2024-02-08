import styles from '../styles/EntityList.module.scss'
import tableStyles from '../styles/Table.module.scss'
import { Table, Button, Modal, ModalDialog, ModalClose } from '@mui/joy';
import { useState, useEffect } from 'react';
import axios from 'axios';
import addMemberSchema from '../validationSchemas/addMemberSchema'
import Snackbar from '@mui/joy/Snackbar'
import { ErrorOutline, CheckCircleOutline } from '@mui/icons-material'

export default function Members() {
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState({
        addMember: false,
        editMember: false,
        deleteMember: false
    })
    const [members, setMembers] = useState([])
    const [selectedMember, setSelectedMember] = useState({})
    const [addMember, setAddMember] = useState(false)
    const [editMember, setEditMember] = useState(false)
    const [deleteMember, setDeleteMember] = useState(false)
    const [memberDetails, setMemberDetails] = useState(false)
    const [memberData, setMemberData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        birthDay: '',
        address: '',
        city: ''
    })

    useEffect(() => {
        axios.get('http://localhost:8000/members').then(res => {
            setMembers(res.data)
        })
    }, [])

    const handleAddMember = () => {
        addMemberSchema.validate(memberData).then(() => {
            axios.post('http://localhost:8000/members/addmember', memberData).then(res => {
                setMembers([...members, res.data])
                setAddMember(false)
                setSuccess({...success, addMember: true})
                setTimeout(() => {
                    setSuccess({...success, addMember: false})
                }, 5000)
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 5000)
        })
    }

    const handleDeleteMember = () => {
        axios.delete(`http://localhost:8000/members/delmember/${selectedMember.id}`).then(res => {
            setMembers(members.filter(member => member.id !== selectedMember.id))
            setDeleteMember(false)
            setMemberDetails(false)
            setSuccess({...success, deleteMember: true})
            setTimeout(() => {
                setSuccess({...success, deleteMember: false})
            }, 5000)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleEditMember = () => {
        addMemberSchema.validate(memberData).then(() => {
            axios.put(`http://localhost:8000/members/updatemember/${selectedMember.id}`, memberData).then(res => {
                setMembers(members.map(member => {
                    if(member.id === selectedMember.id) {
                        return res.data
                    }
                    return member
                }))
                setEditMember(false)
                setSuccess({...success, editMember: true})
                setTimeout(() => {
                    setSuccess({...success, editMember: false})
                }, 5000)
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
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
                                <th style={{width: '10%'}} className={tableStyles.tableHeadItem}>Member ID</th>
                                <th className={tableStyles.tableHeadItem}>First Name</th>
                                <th className={tableStyles.tableHeadItem}>Last Name</th>
                                <th className={tableStyles.tableHeadItem}>Email</th>
                                <th className={tableStyles.tableHeadItem}>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody className={tableStyles.tableBody}>
                            {
                                members.map(member => {
                                    return (
                                        <tr key={member.id} onClick={() => {setMemberDetails(true); setSelectedMember(member)}} className={tableStyles.tableEntry}>
                                            <td className={tableStyles.tableEntryText}>{member.id}</td>
                                            <td className={tableStyles.tableEntryText}>{member.firstName}</td>
                                            <td className={tableStyles.tableEntryText}>{member.lastName}</td>
                                            <td className={tableStyles.tableEntryText}>{member.email}</td>
                                            <td className={tableStyles.tableEntryText}>{member.phoneNumber}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                <div className={styles.toolBar}>
                    <Button onClick={() => setAddMember(true)} className={styles.button}>Add Member</Button>
                    <Button className={styles.button}>Import from CSV File</Button>
                    <Button className={styles.button}>Export to CSV File</Button>
                </div>
            </div>
            <Modal open={addMember}>
                <ModalDialog className={styles.modal}>
                    <ModalClose onClick={() => setAddMember(false)} />
                    <div className={styles.modalContent}>
                        <h1 className={styles.modalTitle}>Add Member</h1>
                        <div className={styles.modalForm}>
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>First Name</label>
                                <input onChange={(e) => setMemberData({...memberData, firstName: e.target.value})} type='text' className={styles.modalFormItemInput} />
                            </div>
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>Last Name</label>
                                <input onChange={(e) => setMemberData({...memberData, lastName: e.target.value})} type='text' className={styles.modalFormItemInput} />
                            </div>
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>Email</label>
                                <input onChange={(e) => setMemberData({...memberData, email: e.target.value})} type='email' className={styles.modalFormItemInput} />
                            </div>
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>Phone Number</label>
                                <input onChange={(e) => setMemberData({...memberData, phoneNumber: e.target.value})} type='text' className={styles.modalFormItemInput} />
                            </div>
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>Date of Birth</label>
                                <input onChange={(e) => setMemberData({...memberData, birthDay: e.target.value})} type='date' className={styles.modalFormItemInput} />
                            </div> 
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>Address</label>
                                <input onChange={(e) => setMemberData({...memberData, address: e.target.value})} type='text' className={styles.modalFormItemInput} />
                            </div> 
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>City</label>
                                <input onChange={(e) => setMemberData({...memberData, city: e.target.value})} type='text' className={styles.modalFormItemInput} />
                            </div> 
                        </div>
                        <Button onClick={handleAddMember}>
                            Add Member
                        </Button>
                    </div>
                </ModalDialog>
            </Modal>
            <Modal open={memberDetails}>
                <ModalDialog className={styles.modal} style={{width: '80%'}}>
                    <ModalClose onClick={() => setMemberDetails(false)} />
                    <div className={styles.modalContent}>
                        <h1 className={styles.modalTitle}>Member Details</h1>
                        <div className={styles.modalDetails}>
                            <p className={styles.modalDetailItem}><strong style={{color: 'white'}}>First Name: </strong>{selectedMember.firstName}</p>
                            <p className={styles.modalDetailItem}><strong style={{color: 'white'}}>Last Name: </strong>{selectedMember.lastName}</p>
                            <p className={styles.modalDetailItem}><strong style={{color: 'white'}}>Email: </strong>{selectedMember.email}</p>
                            <p className={styles.modalDetailItem}><strong style={{color: 'white'}}>Phone Number: </strong>{selectedMember.phoneNumber}</p>
                            <p className={styles.modalDetailItem}><strong style={{color: 'white'}}>Date of Birth: </strong>{selectedMember.birthDay?.slice(0, 10)}</p>
                            <p className={styles.modalDetailItem}><strong style={{color: 'white'}}>Address: </strong>{selectedMember.address}</p>
                            <p className={styles.modalDetailItem}><strong style={{color: 'white'}}>City: </strong>{selectedMember.city}</p>
                        </div>
                        <h1 className={styles.modalTitle}>Member Packages</h1>
                        <div className={tableStyles.tableContainer}>
                            <Table className={tableStyles.table} aria-label="basic table">
                                <thead>
                                    <tr className={tableStyles.tableHead}>
                                        <th className={tableStyles.tableHeadItem}>Category</th>
                                        <th className={tableStyles.tableHeadItem}>Name</th>
                                        <th className={tableStyles.tableHeadItem}>Start Date</th>
                                        <th className={tableStyles.tableHeadItem}>Expration Date</th>
                                        <th className={tableStyles.tableHeadItem}>Number of Sessions</th>
                                        <th className={tableStyles.tableHeadItem}>Price</th>
                                    </tr>
                                </thead>
                                <tbody className={tableStyles.tableBody}>
                                    <tr className={tableStyles.tableEntry}>
                                        <td className={tableStyles.tableEntryText}>1</td>
                                        <td className={tableStyles.tableEntryText}>Tarik</td>
                                        <td className={tableStyles.tableEntryText}>Maljanovic</td>
                                        <td className={tableStyles.tableEntryText}>24</td>
                                        <td className={tableStyles.tableEntryText}>4</td>
                                        <td className={tableStyles.tableEntryText}>24</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <h1 className={styles.modalTitle}>Member Payments</h1>
                        <div className={tableStyles.tableContainer}>
                            <Table className={tableStyles.table} aria-label="basic table">
                                <thead>
                                    <tr className={tableStyles.tableHead}>
                                        <th className={tableStyles.tableHeadItem}>Item</th>
                                        <th className={tableStyles.tableHeadItem}>Amount (BAM)</th>
                                        <th className={tableStyles.tableHeadItem}>Date of Payment</th>
                                        <th className={tableStyles.tableHeadItem}>Employee</th>
                                    </tr>
                                </thead>
                                <tbody className={tableStyles.tableBody}>
                                    <tr className={tableStyles.tableEntry}>
                                        <td className={tableStyles.tableEntryText}>1</td>
                                        <td className={tableStyles.tableEntryText}>159</td>
                                        <td className={tableStyles.tableEntryText}>6</td>
                                        <td className={tableStyles.tableEntryText}>24</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className={styles.buttonGroup}>
                            <Button onClick={() => {setEditMember(true); setMemberData(selectedMember)}} className={styles.button}>Edit Member</Button>
                            <Button onClick={() => setDeleteMember(true)} color='danger' className={styles.button}>Delete Member</Button>
                        </div>
                    </div>
                </ModalDialog>
            </Modal>
            <Modal open={deleteMember}>
                <ModalDialog className={styles.modal}>
                    <ModalClose onClick={() => setMemberDetails(false)} />
                    <div className={styles.modalContent}>
                        <h1 className={styles.modalTitle}>Delete Member</h1>
                        <p className={styles.modalText}>Are you sure you want to delete this member?</p>
                        <div className={styles.buttonGroup}>
                            <Button onClick={handleDeleteMember} color='danger' className={styles.button}>Delete</Button>
                            <Button onClick={() => setDeleteMember(false)} className={styles.button}>Cancel</Button>
                        </div>
                    </div>
                </ModalDialog>
            </Modal>
            <Modal open={editMember}>
                <ModalDialog className={styles.modal}>
                    <ModalClose onClick={() => setEditMember(false)} />
                    <div className={styles.modalContent}>
                        <h1 className={styles.modalTitle}>Edit Member</h1>
                        <div className={styles.modalForm}>
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>First Name</label>
                                <input value={memberData.firstName} onChange={(e) => setMemberData({...memberData, firstName: e.target.value})} type='text' className={styles.modalFormItemInput} />
                            </div>
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>Last Name</label>
                                <input value={memberData.lastName} onChange={(e) => { setMemberData({...memberData, lastName: e.target.value}) }} type='text' className={styles.modalFormItemInput} />
                            </div>
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>Email</label>
                                <input value={memberData.email} onChange={(e) => { setMemberData({...memberData, email: e.target.value}) }} type='email' className={styles.modalFormItemInput} />
                            </div>
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>Phone Number</label>
                                <input value={memberData.phoneNumber} onChange={(e) => { setMemberData({...memberData, phoneNumber: e.target.value}) }} type='text' className={styles.modalFormItemInput} />
                            </div>
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>Date of Birth</label>
                                <input value={memberData.birthDay} onChange={(e) => { setMemberData({...memberData, birthDay: e.target.value}) }} type='date' className={styles.modalFormItemInput} />
                            </div> 
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>Address</label>
                                <input value={memberData.address} onChange={(e) => { setMemberData({...memberData, address: e.target.value}) }} type='text' className={styles.modalFormItemInput} />
                            </div> 
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>City</label>
                                <input value={memberData.city} onChange={(e) => { setMemberData({...memberData, city: e.target.value}) }} type='text' className={styles.modalFormItemInput} />
                            </div> 
                        </div>
                        <Button onClick={handleEditMember}>
                            Save Changes
                        </Button>
                    </div>
                </ModalDialog>
            </Modal>
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
                open={success.addMember}
                color='success'
                variant='solid'
            >
                <CheckCircleOutline />
                Successfully Created a Member!
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={success.editMember}
                color='success'
                variant='solid'
            >
                <CheckCircleOutline />
                Saved Changes Successfully!
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={success.deleteMember}
                color='success'
                variant='solid'
            >
                <CheckCircleOutline />
                Successfully Removed a Member!
            </Snackbar>
        </>
    )
}