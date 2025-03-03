
import { ReactNode, useEffect } from 'react'
import { NumericFormat } from 'react-number-format'
import classNames from '@/utils/classNames'
import { FaUsers } from "react-icons/fa";
import { PiHandDepositDuotone, PiHandWithdrawDuotone } from "react-icons/pi";
import { AiOutlineStock } from "react-icons/ai";

import {
    TbMoodDollar,
    TbTransactionDollar,
    TbWallet,
    TbNetwork
   
} from 'react-icons/tb'
import { useStoreDashboard } from '@/store/admin/dashboard'
import { CardTop } from '@/@types/admin/dashboard/DashboardTypes'

type SummarySegmentProps = {
    title: string
    value: string | number | ReactNode
    icon: ReactNode
    iconClass: string
    className?: string
}

const SummarySegment = ({
    title,
    value,
    icon,
    iconClass,
    className,
}: SummarySegmentProps) => {
    return (
        <div className={classNames('flex flex-col gap-2 py-4 px-6', className)}>
            <div
                className={classNames(
                    'flex items-center justify-center min-h-12 min-w-12 max-h-12 max-w-12 text-gray-900 rounded-full text-2xl',
                    iconClass,
                )}
            >
                {icon}
            </div>
            <div className="mt-4">
                <div className="mb-1">{title}</div>
                <h3 className="mb-1">{value}</h3>
                <div className="inline-flex items-center flex-wrap gap-1">
                </div>
            </div>
        </div>
    )
}



const TopCard = (data: CardTop) => {

    
    return(
        <>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
                <SummarySegment
                    title="Usuários"
                 
                    value={
                        <NumericFormat 
                            displayType="text"
                            value={data.users}
                            thousandSeparator={true}
                        />
                    }
            
                    icon={<FaUsers />}
                    iconClass="bg-green-200"
                    className="border-b border-r-0 md:border-b-0 md:border-r border-gray-200 dark:border-gray-700"
                />

                <SummarySegment
                    title="Depósitos"
                 
                    value={
                        <NumericFormat 
                            displayType="text"
                            value={data.deposits}
                            thousandSeparator={true}
                        />
                    }
            
                    icon={<PiHandDepositDuotone />}
                    iconClass="bg-green-200"
                    className="border-b border-r-0 md:border-b-0 md:border-r border-gray-200 dark:border-gray-700"
                />


                <SummarySegment
                    title="Saques"
                 
                    value={
                        <NumericFormat 
                            displayType="text"
                            value={data.withdrawal}
                            thousandSeparator={true}
                        />
                    }
            
                    icon={<PiHandWithdrawDuotone />}
                    iconClass="bg-green-200"
                    className="border-b border-r-0 md:border-b-0 md:border-r border-gray-200 dark:border-gray-700"
                />

                <SummarySegment
                    title="Investimentos"
                 
                    value={
                        <NumericFormat 
                            displayType="text"
                            value={data.investments}
                            thousandSeparator={true}
                        />
                    }
            
                    icon={<AiOutlineStock />}
                    iconClass="bg-green-200"
                    className="border-b border-r-0 md:border-b-0 md:border-r border-gray-200 dark:border-gray-700"
                />

           </div>
        </>
    )
}

export default TopCard;