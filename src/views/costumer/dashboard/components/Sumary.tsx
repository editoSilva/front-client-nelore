import Card from '@/components/ui/Card'
import classNames from '@/utils/classNames'
import { NumericFormat } from 'react-number-format'
import {
    TbMoodDollar,
    TbTransactionDollar,
    TbWallet,
    TbNetwork
   
} from 'react-icons/tb'
import type { ReactNode } from 'react'
import type { DashboardTypes } from '@/@types/costumer/dashboard/DashboardTypes'
import { useSessionUser } from '@/store/authStore'

type SumaryProps = {
    data: DashboardTypes
}

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

const Sumary = ({ data }: SumaryProps) => {
      const { user } = useSessionUser()
    
      console.log('user-teste2', user.role)
      
    return (
        <Card>
            <div className="flex items-center justify-between">
                <h4>Dashboard</h4>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
                <SummarySegment
                    title="Saldo"
                    value={
                        <NumericFormat
                            prefix="R$"
                            displayType="text"
                            value={data.walletBalance}
                            thousandSeparator={true}
                        />
                    }
             
                    icon={<TbWallet />}
                    iconClass="bg-green-200"
                    className="border-b border-r-0 md:border-b-0 md:border-r border-gray-200 dark:border-gray-700"
                />

                <SummarySegment
                    title="Investido"
                    value={
                        <NumericFormat
                            prefix="R$"
                            displayType="text"
                            value={data.totalInvested}
                            thousandSeparator={true}
                        />
                    }

                    icon={<TbTransactionDollar />}
                    iconClass="bg-yellow-200"
                    className="border-b border-r-0 md:border-b-0 md:border-r border-gray-200 dark:border-gray-700"
                />

                <SummarySegment
                    title="Retorno"
                    value={
                        <NumericFormat
                            prefix="R$"
                            displayType="text"
                            value={data.investmentReturns}
                            thousandSeparator={true}
                        />
                    }

                    icon={<TbMoodDollar />}
                    iconClass="bg-cyan-200"
                    className="border-b border-r-0 md:border-b-0 md:border-r border-gray-200 dark:border-gray-700"
                />


{user.role === 'sponsor' &&  
                <SummarySegment
                    title="Bônus Rede"
                    value={
                        <NumericFormat
                            prefix="R$"
                            displayType="text"
                            value={data.referralBonus}
                            thousandSeparator={true}
                        />
                    }

                    icon={<TbNetwork />}
                    iconClass="bg-cyan-200"
                    className="border-b border-r-0 md:border-b-0 md:border-r border-gray-200 dark:border-gray-700"
                

                />}

           
            
            </div>

         
        </Card>
    )
}

export default Sumary
