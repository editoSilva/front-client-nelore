import { useState, useMemo, useEffect, useCallback } from 'react'
import { Filter, useTransactionStore } from "@/store/costumer/transactions";
import cloneDeep from 'lodash/cloneDeep'
import type { ColumnDef } from '@tanstack/react-table'
import { TransactionsTypes } from '@/@types/costumer/transaction/TransactionTypes'
import { NumericFormat } from 'react-number-format';
import { Tag } from '@/components/ui';
import { DataTable } from '@/components/shared';
import { TableQueries } from '@/@types/common';
import { OnSortParam } from '@/components/shared/DataTable';

// Mova essa função para fora do componente para evitar recriação
const handleClassStatus = (data: string | null): 1 | 0 => {
    if (data === 'paid') return 0;
    if (data === 'pending') return 1;
    return 0;
};

// Definição fixa das cores de status
const orderStatusColor: Record<number, { label: string; bgClass: string; textClass: string }> = {
    0: { label: 'Pago', bgClass: 'bg-success-subtle', textClass: 'text-success' },
    1: { label: 'Pendente', bgClass: 'bg-warning-subtle', textClass: 'text-warning' },
    2: { label: 'Falhou', bgClass: 'bg-error-subtle', textClass: 'text-error' },
};

const TransactionsList = () => {
    const { transactions, isLoading, featchTransactions, tableData, setTableData, filterData, setFilterData } = useTransactionStore();

    // Memorizar `featchTransactions` para evitar re-renderizações desnecessárias
    const featchTransactionsMemoized = useCallback(() => {
        featchTransactions(tableData, filterData);
    }, [tableData, filterData]);

    // Buscar transações na montagem do componente e quando os filtros mudarem
    useEffect(() => {
        featchTransactionsMemoized();
    }, [featchTransactionsMemoized]);

    // Memoizar colunas para evitar recriações
    const columns = useMemo<ColumnDef<TransactionsTypes>[]>(
        () => [
            { header: 'ID_Transação', accessorKey: 'transaction_id' },
            {
                header: 'Valor',
                accessorKey: 'amount',
                cell: ({ row }) => (
                    <span className="heading-text">
                        <NumericFormat
                            fixedDecimalScale
                            prefix="R$ "
                            displayType="text"
                            value={row.original.amount}
                            decimalScale={2}
                            thousandSeparator={true}
                        />
                    </span>
                ),
            },
            { header: 'Criado', accessorKey: 'created_at' },
            { header: 'Pago', accessorKey: 'paymented_at' },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: ({ row }) => {
                    const statusKey = handleClassStatus(row.original.status);
                    return (
                        <Tag className={orderStatusColor[statusKey].bgClass}>
                            <span className={`capitalize font-semibold ${orderStatusColor[statusKey].textClass}`}>
                                {orderStatusColor[statusKey].label}
                            </span>
                        </Tag>
                    );
                },
            },
        ],
        []
    );

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
        <DataTable
            columns={columns}
            data={transactions?.data || []}
            noData={!isLoading && transactions?.data?.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: transactions?.meta?.total || 0,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
        />
    );
};

export default TransactionsList;
