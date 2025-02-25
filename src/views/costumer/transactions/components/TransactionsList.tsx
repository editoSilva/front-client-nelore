import { useState, useMemo, useEffect, useCallback } from 'react';
import { Filter, useTransactionStore } from "@/store/costumer/transactions";
import cloneDeep from 'lodash/cloneDeep';
import { ColumnDef } from '@tanstack/react-table';
import { TransactionsTypes } from '@/@types/costumer/transaction/TransactionTypes';
import { NumericFormat } from 'react-number-format';
import { Tag } from '@/components/ui';
import { DataTable } from '@/components/shared';
import { TableQueries } from '@/@types/common';
import { OnSortParam } from '@/components/shared/DataTable';

const orderStatusColor: Record<number, { label: string; bgClass: string; textClass: string }> = {
    0: { label: 'Pago', bgClass: 'bg-success-subtle', textClass: 'text-success' },
    1: { label: 'Pendente', bgClass: 'bg-warning-subtle', textClass: 'text-warning' },
    2: { label: 'Falhou', bgClass: 'bg-error-subtle', textClass: 'text-error' },
};

const handleClassStatus = (data: string | null): 1 | 0 => {
    if (data === 'paid') return 0;
    if (data === 'pending') return 1;
    return 0;
};

type Transaction = {
    id: number;
    transaction_id: string;
    amount: number;
    status: string;
    created_at: string;
    paymented_at: string;
};

const TransactionsList = () => {
    const { transactions, isLoading, featchTransactions, tableData, setTableData, filterData, setFilterData } = useTransactionStore();
    const [transactionsList, setTransactionsList] = useState<Array<TransactionsTypes>>([]);

    // Função para atualizar a lista de transações, mas apenas quando necessário
    const handleTransactionsUpdate = useCallback(() => {
        if (transactions?.data) {
            setTransactionsList(transactions.data);
        }
    }, [transactions]);

    // Buscar transações na montagem do componente
    useEffect(() => {
        featchTransactions(tableData, filterData);
    }, [filterData, tableData, featchTransactions]);

    // Atualizar a lista de transações quando o estado `transactions` mudar
    useEffect(() => {
        handleTransactionsUpdate();
    }, [handleTransactionsUpdate]);

    const columns = useMemo<ColumnDef<Transaction>[]>(
        () => [
            { header: 'ID_Transação', accessorKey: 'transaction_id' },
            {
                header: 'Valor',
                accessorKey: 'amount',
                cell: (props) => {
                    const { amount } = props.row.original;
                    return (
                        <span className="heading-text">
                            <NumericFormat
                                fixedDecimalScale
                                prefix="R$ "
                                displayType="text"
                                value={amount}
                                decimalScale={2}
                                thousandSeparator={true}
                            />
                        </span>
                    );
                },
            },
            { header: 'Criado', accessorKey: 'created_at' },
            { header: 'Pago', accessorKey: 'paymented_at' },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const { status } = props.row.original;
                    return (
                        <Tag className={orderStatusColor[handleClassStatus(status)].bgClass}>
                            <span className={`capitalize font-semibold ${orderStatusColor[handleClassStatus(status)].textClass}`}>
                                {orderStatusColor[handleClassStatus(status)].label}
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
        featchTransactions(data, filter);
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
            data={transactionsList}
            noData={!isLoading && transactionsList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: transactions.meta.total,
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
