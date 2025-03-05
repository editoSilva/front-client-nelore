import { Filter, useStoreuser } from "@/store/admin/users";
import { useCallback, useEffect, useMemo } from "react";

import { DataTable } from '@/components/shared';
import { TableQueries } from '@/@types/common';
import { OnSortParam } from '@/components/shared/DataTable';
import cloneDeep from 'lodash/cloneDeep'
import type { ColumnDef } from '@tanstack/react-table'
import { UserType } from "@/@types/admin/users/UsersTypes";
import { FaEye } from "react-icons/fa";

import { useNavigate, useParams } from 'react-router-dom';
import Loading from "@/components/shared/Loading";


const UsersList = () => {
    const navigate = useNavigate()

    const ActionColumn = ({
        onEdit
      
    }: {
        onEdit: () => void
      
    }) => {
        return (
            <div className="flex items-center justify-start">
            <div
                    className="text-xl font-semibold cursor-pointer select-none hover:text-green-500 transition-colors"
                    role="button"
                    tabIndex={0}
                    aria-label="Editar"
                    onClick={onEdit}
                    onKeyDown={(e) => e.key === "Enter" && onEdit()}
                >
                    <FaEye />
                </div>
        </div>
        )
    }
    
    const { role } = useParams();
    const { users, isLoading, featchUsers, tableData, setTableData, filterData, setFilterData } = useStoreuser();

    // Memorizar `featchTransactions` para evitar re-renderizações desnecessárias
    const featchTransactionsMemoized = useCallback(() => {
        featchUsers(tableData, filterData, role);
    }, [tableData, filterData, role]);

    // Buscar transações na montagem do componente e quando os filtros mudarem
    useEffect(() => {
        featchTransactionsMemoized();
    }, [featchTransactionsMemoized]);

    // Memoizar colunas para evitar recriações
    const columns = useMemo<ColumnDef<UserType >[]>(
        () => [
            { header: 'ID', accessorKey: 'id' },
            // {
            //     header: 'Valor',
            //     accessorKey: 'amount',
            //     cell: ({ row }) => (
            //         <span className="heading-text">
            //             <NumericFormat
            //                 fixedDecimalScale
            //                 prefix="R$ "
            //                 displayType="text"
            //                 value={row.original.amount}
            //                 decimalScale={2}
            //                 thousandSeparator={true}
            //             />
            //         </span>
            //     ),
            // },
            { header: 'Name', accessorKey: 'name' },
            { header: 'E-mail', accessorKey: 'email' },
            { header: 'CPF', accessorKey: 'cpf' },
            { header: 'Indicações', accessorKey: 'referrals' },
            { header: 'Criado em', accessorKey: 'created_at' },
            {
                header: "Vizualizar",
                
                cell: ({ row }) => (
                    <span className="heading-text">
                    <ActionColumn onEdit={() => handleEdit(row.original)} />
                    </span>
                ),
            },
            
        ],
        []
    );

        const handleEdit = (user: UserType) => {
            navigate(`/admin/user/${user.id}`)
        }
    

    const handleSetTableData = (data: TableQueries, filter: Filter) => {
        setTableData(data);
        setFilterData(filter);
    };

    const handlePaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData);
        newTableData.pageIndex = page;
        handleSetTableData(newTableData, filterData);
    };

    const handleSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData);
        newTableData.pageSize = Number(value);
        newTableData.pageIndex = 1;
        handleSetTableData(newTableData, filterData);
    };

    const handleSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData);
        newTableData.sort = sort;
        handleSetTableData(newTableData, filterData);
    };

    return (
        <>
        <Loading loading={isLoading}>
            <DataTable
                columns={columns}
                data={users?.data || []}
                noData={!isLoading && users?.data?.length === 0}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={isLoading}
                pagingData={{
                    total: users?.meta?.total || 0,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
                onSort={handleSort}
            />
        </Loading>
        </>
    );     
}



export default UsersList;