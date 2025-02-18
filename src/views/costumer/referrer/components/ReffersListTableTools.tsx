
import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'
import cloneDeep from 'lodash/cloneDeep'
import type { ChangeEvent } from 'react'
import { useReferrerStore } from "@/store/costumer/referrer";
import TransactionTableFilter from '../../transactions/components/TransactionTableFilter';


const ReffersListTableTools = () => {
    const { tableData, setTableData }  = useReferrerStore();

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <DebouceInput
                placeholder="Pesquisar nome..."
                suffix={<TbSearch className="text-lg" />}
                onChange={handleInputChange}
            />
            <TransactionTableFilter />
        </div>
    )
}

export default ReffersListTableTools
