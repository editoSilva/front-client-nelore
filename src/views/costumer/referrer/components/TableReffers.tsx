import { useState, useEffect } from 'react';
import { useReferrerStore } from "@/store/costumer/referrer";
import Table from '@/components/ui/Table';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import type { ColumnDef, ColumnSort } from '@tanstack/react-table';
import { NumericFormat } from 'react-number-format';
import { Tag } from '@/components/ui';

type Transaction = {
    transaction_id: string;
    amount: number;
    status: string;
    created_at: string;
    paymented_at: string;
};

const orderStatusColor: Record<
    number,
    {
        label: string
        bgClass: string
        textClass: string
    }
> = {
    0: {
        label: 'Pago',
        bgClass: 'bg-success-subtle',
        textClass: 'text-success',
    },
    1: {
        label: 'Pendente',
        bgClass: 'bg-warning-subtle',
        textClass: 'text-warning',
    },
    2: { label: 'Falhou', bgClass: 'bg-error-subtle', textClass: 'text-error' },
}

const handleClassStatus = (data: string) => {

    if(data == 'paid') {
        return 0;
    }
    if(data === 'pending') {
        return 1;
    }
   

}

const columns: ColumnDef<Transaction>[] = [
    {
        header: '#ID',
        accessorKey: 'transaction_id',
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
        cell: (props) => {
            const { status } = props.row.original
            return (
                <Tag className={orderStatusColor[handleClassStatus(status)].bgClass}>
                    <span
                        className={`capitalize font-semibold ${orderStatusColor[handleClassStatus(status)].textClass}`}
                    >
                        {orderStatusColor[handleClassStatus(status)].label}
                    </span>
                </Tag>
            )
        },
    },
];

const { Tr, Th, Td, THead, TBody, Sorter } = Table;

const TableReffers = () => {
    const { referres, isLoading, featchReferrers } = useReferrerStore();
    const [referrerList, setReferrerList] = useState<Transaction[]>([]);
    const [sorting, setSorting] = useState<ColumnSort[]>([]);

    useEffect(() => {
        featchReferrers();
    }, []);

    useEffect(() => {
        if (Array.isArray(referres?.data)) {
            setReferrerList(referres.data);
        }
    }, [referres]);

    const table = useReactTable({
        data: referrerList,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    if (isLoading) {
        return <div>Carregando transações...</div>;
    }

    return (
        <Table>
            <THead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <Tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <Th key={header.id} colSpan={header.colSpan}>
                                {header.isPlaceholder ? null : (
                                    <div
                                        {...{
                                            className: header.column.getCanSort()
                                                ? 'cursor-pointer select-none'
                                                : '',
                                            onClick:
                                                header.column.getToggleSortingHandler(),
                                        }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        <Sorter sort={header.column.getIsSorted()} />
                                    </div>
                                )}
                            </Th>
                        ))}
                    </Tr>
                ))}
            </THead>
            <TBody>
                {table.getRowModel().rows.map((row) => (
                    <Tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <Td key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </Td>
                        ))}
                    </Tr>
                ))}
            </TBody>
        </Table>
    );
};

export default TableReffers;
