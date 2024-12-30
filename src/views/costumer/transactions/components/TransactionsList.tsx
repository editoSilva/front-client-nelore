
import { useState, useMemo, useEffect } from 'react'
import { useTransactionStore } from "@/store/costumer/transactions";
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import Select from '@/components/ui/Select'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import { TransactionsTypes } from '@/@types/costumer/transaction/TransactionTypes'
import { NumericFormat } from 'react-number-format';
import { Progress } from '@/components/ui';
import classNames from '@/utils/classNames';
import {  DataTable } from '@/components/shared';



type Transaction = {
    id: number
    transaction_id: string
    amount:number
    status: string
    created_at: string
    paymented_at: string
}



const TransactionsList = () => {

    
    const {transactions, isLoading, featchTransactions} = useTransactionStore();

      useEffect( () => {
        featchTransactions()
    },[transactions])


    useEffect( () => {
        featchTransactions()
    },[])

    console.log('transs', transactions.data)

    

    const columns = useMemo<ColumnDef<Transaction>[]>(
        () => [
            {
                header: 'ID',
                accessorKey: 'id',
            },
            {
                header: 'ID_Transação',
                accessorKey: 'transaction_id',
            },
            {
                header: 'Valor',
                accessorKey: 'amount',
            },
            {
                header: 'Criado',
                accessorKey: 'created_at',
            },
            {
                header: 'Pago',
                accessorKey: 'paymented_at',
            },
            {
                header: 'Status',
                accessorKey: 'status',
            },
        ],
        []
    )

   
    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedProduct.length > 0) {
            setSelectAllProduct([])
        }
    }

    const handlePaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        handleSetTableData(newTableData)
    }

    const handleSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        handleSetTableData(newTableData)
    }

    const handleSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        handleSetTableData(newTableData)
    }

    const handleRowSelect = (checked: boolean, row: Product) => {
        setSelectedProduct(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Product>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllProduct(originalRows)
        } else {
            setSelectAllProduct([])
        }
    }
    return (
        <>
        <DataTable
             
                columns={columns}
                data={transactions.data}
                noData={!isLoading && transactions.data.length === 0}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={isLoading}
                pagingData={{
                    total: transactions.meta.total,
                    pageIndex: transactions.meta.from,
                    pageSize: transactions.meta.per_page ,
                }}
               
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
                onSort={handleSort}
                onCheckBoxChange={handleRowSelect}
                onIndeterminateCheckBoxChange={handleAllRowSelect}
            />
           
         
        </>
    )
}

export default TransactionsList;

