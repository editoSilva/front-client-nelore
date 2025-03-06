
import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'
import cloneDeep from 'lodash/cloneDeep'
import type { ChangeEvent } from 'react'
import { useStoreuser } from '@/store/admin/users';
import UserTablerFilter from './UserTableFilter'

const UserListTableTools = () => {
    const { tableData, setTableData }  = useStoreuser();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            setTableData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            setTableData(newTableData)
        }
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
            <DebouceInput
                placeholder="Nome"
                suffix={<TbSearch className="text-lg" />}
                onChange={handleInputChange}
            />
            <UserTablerFilter/>
        </div>
    )
}

export default UserListTableTools
