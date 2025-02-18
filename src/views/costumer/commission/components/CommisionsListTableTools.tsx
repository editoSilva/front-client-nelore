
import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'
import cloneDeep from 'lodash/cloneDeep'
import type { ChangeEvent } from 'react'
import { useCommisionStore } from "@/store/costumer/commision"
import CommisionsTableFilter from './CommisionsTableFilter'


const CommisionsTableTools = () => {
    const { tableData, setTableData }  = useCommisionStore();

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
            <CommisionsTableFilter />
        </div>
    )
}

export default CommisionsTableTools
