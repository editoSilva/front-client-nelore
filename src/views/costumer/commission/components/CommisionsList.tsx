
import { useState, useMemo, useEffect } from 'react'
import { Filter, useCommisionStore } from "@/store/costumer/commision";
import { NumericFormat } from 'react-number-format';
import cloneDeep from 'lodash/cloneDeep'
import type { ColumnDef } from '@tanstack/react-table'
import { Commission } from '@/@types/costumer/commission/CommissionTypes'
import {  DataTable } from '@/components/shared';
import { TableQueries } from '@/@types/common';
import { OnSortParam } from '@/components/shared/DataTable';

type Commision = {
    user: string
    description: string
    created_at: string
    amount: number
}


const CommisionsList = () => {
    
    const { commisions, isLoading, featchCommisions, tableData, setTableData, filterData, setFilterData} = useCommisionStore();

    const [commisionList, setCommisionList] = useState<Array<Commission>>([]);
  
    // Função para atualizar a lista de transações
    const handleCommisionsUpdate = () => {
      if (commisions?.data) {

        setCommisionList(commisions.data);
      }
    };
  
    // Buscar transações na montagem do componente
    useEffect(() => {
        featchCommisions(tableData, filterData);
    }, [filterData, tableData, featchCommisions]);
  
    // Atualizar a lista de transações quando o estado `transactions` mudar
    useEffect(() => {
      handleCommisionsUpdate();
    }, [commisions]);
   
    const columns = useMemo<ColumnDef<Commision>[]>(
        () => [
           
            {
                header: 'Nível',
                accessorKey: 'description',

            },
            {
                header: 'Nome',
                accessorKey: 'user',
            },
            {
                   header: 'Valor',
                   accessorKey: 'amount',
                   cell: ({ getValue }) => (
                       <NumericFormat
                           value={getValue<number>()}
                           displayType="text"
                           thousandSeparator="."
                           decimalSeparator=","
                           prefix="R$ "
                       />
                   ),
               },
            {
                header: 'Criado Em',
                accessorKey: 'created_at',

            },
           
        ],
        []
    )
   
    const handleSetTableData = (data: TableQueries, filter: Filter) => {
        setTableData(data)
        setFilterData(filter)
        featchCommisions(data, filter)
    }

    const handlePaginationChange = (page: number) => {
        console.log('page', page)
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        handleSetTableData(newTableData, filterData)
        console.log('pageTable', newTableData)
    }

    const handleSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        handleSetTableData(newTableData, filterData)
    }

    const handleSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        console.log('newTable', newTableData)
        handleSetTableData(newTableData, filterData)
    }



    return (
        <>
        <DataTable
                columns={columns}
                data={commisionList}
                noData={!isLoading && commisionList.length === 0}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={isLoading}
          
                pagingData={{
                    total: commisions.meta.total,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
               
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
                onSort={handleSort}
                
              
            />
           
         
        </>
    )
}

export default CommisionsList;

