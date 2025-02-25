import Chart from 'react-apexcharts'
import { COLOR_2 } from '@/constants/chart.constant'
import Card from '@/components/ui/Card'
import { useChartStore } from '@/store/costumer/charts';
import { useEffect } from "react";

const InvestimentChart = () => {

     const { investmentchart, fetchInvestChart } = useChartStore();


     useEffect(() => {
        fetchInvestChart(); // Busca os dados sempre que o componente for montado
         }, []);
     
         useEffect(() => {
             console.log("Store atualizada:", investmentchart);
             // Aqui você pode forçar um reload ou atualizar algum estado da interface se necessário
         }, [investmentchart]); // Dispara sempre que os dados da store forem alterados
     


    // Retorno dos investimentos em porcentagem por dia da semana
    const investmentReturns = investmentchart.percentages; // Exemplo de valores (%)

    const data = [
        {
            name: 'Retorno (%)',
            data: investmentReturns,
        },
    ];

    const daysOfWeek = investmentchart.labels;

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
