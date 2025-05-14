
import Card from '@/components/ui/Card'
import classNames from '@/utils/classNames'

import {TbUsers, TbArrowAutofitContentFilled, TbExternalLink} from 'react-icons/tb'
import { DashboardTypes } from '@/@types/costumer/dashboard/DashboardTypes';
import { FaPercent } from "react-icons/fa";
import type { ReactNode } from 'react'
import { useSessionUser } from '@/store/authStore';

type StatisticCardProps = {
    title: string
    icon: ReactNode
    className: string
    value: number
}

type OverviewAfiliate = {
    data: DashboardTypes
}

const StatisticCard = ({
    title,
    className,
    icon,
    value,
}: StatisticCardProps) => {
    return (
        <div
            className={classNames(
                'rounded-2xl p-4 flex flex-col justify-center',
                className,
            )}
        >
            <div className="flex justify-between items-center relative">
                <div>
                    <div className="mb-4 text-gray-900 font-bold">{title}</div>
                    <h1 className="mb-1 text-gray-900">{value}</h1>
                </div>
                <div
                    className={
                        'flex items-center justify-center min-h-12 min-w-12 max-h-12 max-w-12 bg-gray-900 text-white rounded-full text-2xl'
                    }
                >
                    {icon}
                </div>
            </div>
        </div>
    )
}

const OverviewAfiliate = ({ data }: OverviewAfiliate) => {

const { user } = useSessionUser()
    return (
        <Card>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 rounded-2xl mt-4">
                <StatisticCard
                    title="Preço Boi Gordo R$"
                    className="bg-gray-400 dark:bg-opacity-75"
                    value={data.dailyPrice}
                    icon={<TbArrowAutofitContentFilled />}
                />

                {user.role === 'sponsor' &&  
                <>
                                <StatisticCard
                                    title="Visitas"
                                    className="bg-gray- dark:bg-opacity-75"
                                    value={data.visited}
                                    icon={<TbExternalLink />}
                                />
                                <StatisticCard
                                    title="Indicados"
                                    className="bg-teal-500 dark:bg-opacity-75"
                                    value={data.total_network}
                                    icon={<TbUsers />}
                                />


                              
                        </>     
                }

                                <StatisticCard
                                    title="Disponível Saque"
                                    className="bg-blue-500 dark:bg-opacity-75"
                                    value={data.withdrawl}
                                    icon={<FaPercent />}
                                />
                            
                
             
            </div>
        </Card>
    )
}

export default OverviewAfiliate
