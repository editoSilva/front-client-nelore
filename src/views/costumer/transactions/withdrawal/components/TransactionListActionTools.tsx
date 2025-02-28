import { useState } from 'react'
import Button from '@/components/ui/Button'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import { useTransactionStore } from "@/store/costumer/transactions";
import { CSVLink } from 'react-csv'
import ModalDeposit from './ModalWithdrawl';


const TransactionListActionTools = () => {
  
    const { transactions, transactionsWithdrawals } = useTransactionStore();

    const [depositoIsOpen, setdepositoIsOpen] = useState(false)

    const openDepositModal = () => {
  
        setdepositoIsOpen(true)
    }

    const closeDepositModal = () => {
        setdepositoIsOpen(false)
    }

    return (
        <>
         <ModalDeposit open={depositoIsOpen} onClose={closeDepositModal}/>
         
            <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="customerList.csv"
                data={transactionsWithdrawals.data}
            >
                <Button
                    icon={<TbCloudDownload className="text-xl" />}
                    className="w-full"
                >
                    Download
                </Button>
            </CSVLink>
            <Button
                variant="solid"
                icon={<TbPlus className="text-xl" />}
                onClick={ openDepositModal  }
            >
                Sacar
            </Button>
        </div>
        </>
       
    )
}

export default TransactionListActionTools
