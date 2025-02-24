import Chart from 'react-apexcharts'
import { COLOR_2 } from '@/constants/chart.constant'
import Card from '@/components/ui/Card'

const InvestimentChart = () => {
    // Retorno dos investimentos em porcentagem por dia da semana
    const investmentReturns = [2.5, 3.1, 1.2, 4.8, 5.6, 0.5, 2.3]; // Exemplo de valores (%)

    const data = [
        {
            name: 'Retorno (%)',
            data: investmentReturns,
        },
    ];

    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    return (
        <>
            <Card>
                <div className="flex items-center justify-between">
                    <h4>Retorno dos Investimentos (%)</h4>
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
                            categories: daysOfWeek,
                        },
                    }}
                    series={data}
                    height={300}
                />
            </Card>
        </>
    );
};

export default InvestimentChart;
