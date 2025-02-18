
import { useState, useMemo, useEffect } from 'react'
import { Filter, useReferrerStore } from "@/store/costumer/referrer";

import cloneDeep from 'lodash/cloneDeep'

import type { ColumnDef } from '@tanstack/react-table'
import { ReferrerTypes} from '@/@types/costumer/referrer/ReferrerTypes'

import {  DataTable } from '@/components/shared';
import { TableQueries } from '@/@types/common';
import { OnSortParam } from '@/components/shared/DataTable';








type Referrer = {
    name: string
    email: string
    phone: string
    cpf:string
    created_at: string
   
}


const ReffersList = () => {
    
    const { referres, isLoading, featchReferrers, tableData, setTableData, filterData, setFilterData} = useReferrerStore();

    const [referreList, setReferrerList] = useState<Array<ReferrerTypes>>([]);
  
    // Função para atualizar a lista de transações
    const handleTransactionsUpdate = () => {
      if (referres?.data) {

        setReferrerList(referres.data);
      }
    };
  
    // Buscar transações na montagem do componente
    useEffect(() => {
        featchReferrers(tableData, filterData);
    }, [filterData, tableData, featchReferrers]);
  
    // Atualizar a lista de transações quando o estado `transactions` mudar
    useEffect(() => {
      handleTransactionsUpdate();
    }, [referres]);
   
    const columns = useMemo<ColumnDef<Referrer>[]>(
        () => [
           
          
            {
                header: 'Nome',
                accessorKey: 'name',
            },
            
            {
                header: 'E-mail',
                accessorKey: 'email',
            },
            {
                header: 'Fone',
                accessorKey: 'phone',

            },
            {
                header: 'CPF',
                accessorKey: 'cpf',

            },

            {
                header: 'Criado em',
                accessorKey: 'created_at',
            },
        ],
        []
    )
   
    const handleSetTableData = (data: TableQueries, filter: Filter) => {
        setTableData(data)
        setFilterData(filter)
        featchReferrers(data, filter)
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
                data={referreList}
                noData={!isLoading && referreList.length === 0}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={isLoading}
          
                pagingData={{
                    total: referres.meta.total,
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

export default ReffersList;

