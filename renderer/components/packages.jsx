import styles from '../styles/EntityList.module.scss'
import tableStyles from '../styles/Table.module.scss'
import { Table, Button, Modal, ModalDialog, ModalClose } from '@mui/joy';
import { useState, useEffect } from 'react';
import axios from 'axios';
import packageSchema from '../validationSchemas/packageSchema'
import Snackbar from '@mui/joy/Snackbar'
import { ErrorOutline, CheckCircleOutline } from '@mui/icons-material'

export default function Packages() {
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState({
        addPackage: false,
        updatePackage: false,
        deletePackage: false
    })
    const [packages, setPackages] = useState([])
    const [selectedPackage, setSelectedPackage] = useState({})
    const [packageDetails, setPackageDetails] = useState(false)
    const [addPackage, setAddPackage] = useState(false)
    const [packageData, setPackageData] = useState({
        category: '',
        name: '',
        description: '',
        timeUnit: '',
        duration: '',
        numberOfSessions: 0,
        price: 0,
        startPeriod: '',
        endPeriod: ''
    })

    useEffect(() => {
        axios.get('http://localhost:8000/packages/').then(res => {
            setPackages(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const handleAddPackage = () => {
        packageSchema.validate(packageData).then(() => {
            axios.post('http://localhost:8000/packages/addpackage', packageData).then(res => {
                setPackages([...packages, res.data])
                setAddPackage(false)
                setSuccess({...success, addPackage: true})
                setTimeout(() => {
                    setSuccess({...success, addPackage: false})
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

  return (
    <>
        <div className={styles.main}>
            <div className={tableStyles.tableContainer}>
                <Table className={tableStyles.table} aria-label="basic table">
                    <thead>
                        <tr className={tableStyles.tableHead}>
                            <th className={tableStyles.tableHeadItem}>Category</th>
                            <th className={tableStyles.tableHeadItem}>Name</th>
                            <th className={tableStyles.tableHeadItem}>Time Unit</th>
                            <th className={tableStyles.tableHeadItem}>Duration</th>
                            <th className={tableStyles.tableHeadItem}>Number of Sessions</th>
                            <th className={tableStyles.tableHeadItem}>Price</th>
                        </tr>
                    </thead>
                    <tbody className={tableStyles.tableBody}>
                        {
                            packages.map((pkg, index) => {
                                return (
                                    <tr key={index} className={tableStyles.tableEntry} onClick={() => {setPackageDetails(true); setSelectedPackage(pkg)}}>
                                        <td className={tableStyles.tableEntryText}>{pkg.category}</td>
                                        <td className={tableStyles.tableEntryText}>{pkg.name}</td>
                                        <td className={tableStyles.tableEntryText}>{pkg.timeUnit}</td>
                                        <td className={tableStyles.tableEntryText}>{pkg.duration}</td>
                                        <td className={tableStyles.tableEntryText}>{pkg.numberOfSessions}</td>
                                        <td className={tableStyles.tableEntryText}>{pkg.price} BAM</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
            <div className={styles.toolBar}>
                <Button onClick={() => setAddPackage(true)} className={styles.button}>Add Package</Button>
            </div>
            <Modal open={addPackage}>
                <ModalDialog className={styles.modal}>
                    <ModalClose onClick={() => setAddPackage(false)} />
                    <div className={styles.modalContent}>
                        <h1 className={styles.modalTitle}>Add Package</h1>
                        <div className={styles.modalForm}>
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>Category</label>
                                <input onChange={(e) => setPackageData({...packageData, category: e.target.value})} type='text' className={styles.modalFormItemInput} />
                            </div>
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>Name</label>
                                <input onChange={(e) => setPackageData({...packageData, name: e.target.value})} type='text' className={styles.modalFormItemInput} />
                            </div>
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>Description</label>
                                <textarea style={{height: '80px'}} onChange={(e) => setPackageData({...packageData, description: e.target.value})} type='email' className={styles.modalFormItemInput} />
                            </div>
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>Time Unit</label>
                                <select onChange={(e) => setPackageData({...packageData, timeUnit: e.target.value})} type='text' className={styles.modalFormItemInput} >
                                    <option value='Days'>Days</option>
                                    <option value='Weeks'>Weeks</option>
                                    <option value='Months'>Months</option>
                                </select>
                            </div>
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>Duration</label>
                                <input onChange={(e) => setPackageData({...packageData, duration: e.target.value})} type='text' className={styles.modalFormItemInput} />
                            </div> 
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>Number of Sessions</label>
                                <input onChange={(e) => setPackageData({...packageData, numberOfSessions: Number(e.target.value)})} type='number' min={0} className={styles.modalFormItemInput} />
                            </div> 
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>Price</label>
                                <input onChange={(e) => setPackageData({...packageData, price: Number(e.target.value)})} type='number' min={0} className={styles.modalFormItemInput} />
                            </div> 
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>Start Period</label>
                                <input onChange={(e) => setPackageData({...packageData, startPeriod: e.target.value})} type='time' className={styles.modalFormItemInput} />
                            </div> 
                            <div className={styles.modalFormItem}>
                                <label className={styles.modalFormItemLabel}>End Period</label>
                                <input onChange={(e) => setPackageData({...packageData, endPeriod: e.target.value})} type='time' className={styles.modalFormItemInput} />
                            </div> 
                        </div>
                        <Button onClick={handleAddPackage}>
                            Add Member
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
            open={success.addMember}
            color='success'
            variant='solid'
        >
            <CheckCircleOutline />
            Successfully Created a Package!
        </Snackbar>
    </>
  );
}