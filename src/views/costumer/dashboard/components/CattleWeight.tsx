import Chart from 'react-apexcharts'
import { COLOR_1 } from '@/constants/chart.constant'
import Card from '@/components/ui/Card'
import { useChartStore } from '@/store/costumer/charts';
import { useEffect } from "react";

const CattleWeight = () => {

    const { cattleweight, fetchCattleWeight } = useChartStore();


    useEffect(() => {
        fetchCattleWeight(); // Busca os dados sempre que o componente for montado
    }, []);

    useEffect(() => {
        console.log("Store atualizada:", cattleweight);
        // Aqui você pode forçar um reload ou atualizar algum estado da interface se necessário
    }, [cattleweight]); // Dispara sempre que os dados da store forem alterados



    // Convertendo para preço por arroba (1 arroba = 15kg => 1 tonelada = 1000kg = 66.67 arrobas)
    const pricesPerArroba = cattleweight.prices

    const data = [
        {
            name: 'Preço da Arroba (R$)',
            data: pricesPerArroba,
        },
    ];

    const labels = cattleweight.dates;

    return (
        <>
            <Card>
                <div className="flex items-center justify-between">
                    <h4>Preço da Arroba do Boi (R$)</h4>
                </div>
                <Chart
                    options={{
                        chart: {
                            zoom: {
                                enabled: false,
                            },
                        },
                        colors: [COLOR_1],
                        fill: {
                            type: 'gradient',
                            gradient: {
                                shadeIntensity: 1,
                                opacityFrom: 0.7,
                                opacityTo: 0.9,
                                stops: [0, 80, 100],
                            },
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        stroke: {
                            curve: 'smooth',
                            width: 3,
                        },
                        labels: labels,
                        xaxis: {
                            type: 'datetime',
                            labels: {
                                formatter: (value) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString('pt-BR', {
                                        weekday: 'short',
                                    });
                                },
                            },
                        },
                        yaxis: {
                            opposite: true,
                        },
                        legend: {
                            horizontalAlign: 'left',
                        },
                    }}
                    type="area"
                    series={data}
                    height={300}
                />
            </Card>
        </>
    )
}

export default CattleWeight;
