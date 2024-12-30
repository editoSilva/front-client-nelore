import Chart from 'react-apexcharts'
import { COLOR_2 } from '@/constants/chart.constant'
import Card from '@/components/ui/Card'

const InvestimentChart = () => {
    const data = [
        {
            name: 'Desktops',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
    ]

    return (
        <>
             <Card>
             <div className="flex items-center justify-between">
                <h4>Investimentos</h4>
            </div>
                <Chart

                options={{
                    chart: {
                        type: 'line',
                        zoom: {
                            enabled: false,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 3,
                    },
                    colors: [COLOR_2],
                    xaxis: {
                        categories: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                        ],
                    },
                }}
                series={data}
                height={300}
                />

            </Card>
        </>
       
       
    )
}

export default InvestimentChart