import tableStyles from '../styles/Table.module.scss'
import styles from '../styles/EntityList.module.scss'
import { Table, Button } from '@mui/joy';

export default function Employees() {
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
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>1</td>
                                <td className={tableStyles.tableEntryText}>159</td>
                                <td className={tableStyles.tableEntryText}>6</td>
                                <td className={tableStyles.tableEntryText}>24</td>
                                <td className={tableStyles.tableEntryText}>4</td>
                            </tr>
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>2</td>
                                <td className={tableStyles.tableEntryText}>237</td>
                                <td className={tableStyles.tableEntryText}>9</td>
                                <td className={tableStyles.tableEntryText}>37</td>
                                <td className={tableStyles.tableEntryText}>4.3</td>
                            </tr>
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>3</td>
                                <td className={tableStyles.tableEntryText}>262</td>
                                <td className={tableStyles.tableEntryText}>16</td>
                                <td className={tableStyles.tableEntryText}>24</td>
                                <td className={tableStyles.tableEntryText}>6</td>
                            </tr>
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>4</td>
                                <td className={tableStyles.tableEntryText}>305</td>
                                <td className={tableStyles.tableEntryText}>3.7</td>
                                <td className={tableStyles.tableEntryText}>67</td>
                                <td className={tableStyles.tableEntryText}>4.3</td>
                            </tr>
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>5</td>
                                <td className={tableStyles.tableEntryText}>356</td>
                                <td className={tableStyles.tableEntryText}>16</td>
                                <td className={tableStyles.tableEntryText}>49</td>
                                <td className={tableStyles.tableEntryText}>3.9</td>
                            </tr>
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>5</td>
                                <td className={tableStyles.tableEntryText}>356</td>
                                <td className={tableStyles.tableEntryText}>16</td>
                                <td className={tableStyles.tableEntryText}>49</td>
                                <td className={tableStyles.tableEntryText}>3.9</td>
                            </tr>
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>5</td>
                                <td className={tableStyles.tableEntryText}>356</td>
                                <td className={tableStyles.tableEntryText}>16</td>
                                <td className={tableStyles.tableEntryText}>49</td>
                                <td className={tableStyles.tableEntryText}>3.9</td>
                            </tr>
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>5</td>
                                <td className={tableStyles.tableEntryText}>356</td>
                                <td className={tableStyles.tableEntryText}>16</td>
                                <td className={tableStyles.tableEntryText}>49</td>
                                <td className={tableStyles.tableEntryText}>3.9</td>
                            </tr>
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>5</td>
                                <td className={tableStyles.tableEntryText}>356</td>
                                <td className={tableStyles.tableEntryText}>16</td>
                                <td className={tableStyles.tableEntryText}>49</td>
                                <td className={tableStyles.tableEntryText}>3.9</td>
                            </tr>
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>5</td>
                                <td className={tableStyles.tableEntryText}>356</td>
                                <td className={tableStyles.tableEntryText}>16</td>
                                <td className={tableStyles.tableEntryText}>49</td>
                                <td className={tableStyles.tableEntryText}>3.9</td>
                            </tr>
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>5</td>
                                <td className={tableStyles.tableEntryText}>356</td>
                                <td className={tableStyles.tableEntryText}>16</td>
                                <td className={tableStyles.tableEntryText}>49</td>
                                <td className={tableStyles.tableEntryText}>3.9</td>
                            </tr>
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>5</td>
                                <td className={tableStyles.tableEntryText}>356</td>
                                <td className={tableStyles.tableEntryText}>16</td>
                                <td className={tableStyles.tableEntryText}>49</td>
                                <td className={tableStyles.tableEntryText}>3.9</td>
                            </tr>
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>5</td>
                                <td className={tableStyles.tableEntryText}>356</td>
                                <td className={tableStyles.tableEntryText}>16</td>
                                <td className={tableStyles.tableEntryText}>49</td>
                                <td className={tableStyles.tableEntryText}>3.9</td>
                            </tr>
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>5</td>
                                <td className={tableStyles.tableEntryText}>356</td>
                                <td className={tableStyles.tableEntryText}>16</td>
                                <td className={tableStyles.tableEntryText}>49</td>
                                <td className={tableStyles.tableEntryText}>3.9</td>
                            </tr>
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>5</td>
                                <td className={tableStyles.tableEntryText}>356</td>
                                <td className={tableStyles.tableEntryText}>16</td>
                                <td className={tableStyles.tableEntryText}>49</td>
                                <td className={tableStyles.tableEntryText}>3.9</td>
                            </tr>
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>5</td>
                                <td className={tableStyles.tableEntryText}>356</td>
                                <td className={tableStyles.tableEntryText}>16</td>
                                <td className={tableStyles.tableEntryText}>49</td>
                                <td className={tableStyles.tableEntryText}>3.9</td>
                            </tr>
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>5</td>
                                <td className={tableStyles.tableEntryText}>356</td>
                                <td className={tableStyles.tableEntryText}>16</td>
                                <td className={tableStyles.tableEntryText}>49</td>
                                <td className={tableStyles.tableEntryText}>3.9</td>
                            </tr>
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>5</td>
                                <td className={tableStyles.tableEntryText}>356</td>
                                <td className={tableStyles.tableEntryText}>16</td>
                                <td className={tableStyles.tableEntryText}>49</td>
                                <td className={tableStyles.tableEntryText}>3.9</td>
                            </tr>
                            <tr className={tableStyles.tableEntry}>
                                <td className={tableStyles.tableEntryText}>5</td>
                                <td className={tableStyles.tableEntryText}>356</td>
                                <td className={tableStyles.tableEntryText}>16</td>
                                <td className={tableStyles.tableEntryText}>49</td>
                                <td className={tableStyles.tableEntryText}>3.9</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className={styles.toolBar}>
                    <Button className={styles.button}>Add Employee</Button>
                </div>
            </div>
        </>
    )
}