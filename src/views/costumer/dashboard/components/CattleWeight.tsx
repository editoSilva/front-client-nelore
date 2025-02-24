import Chart from 'react-apexcharts'
import { COLOR_1 } from '@/constants/chart.constant'
import Card from '@/components/ui/Card'

const CattleWeight = () => {
    // Preços originais por tonelada (R$/ton)
    const pricesPerTon = [
        8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3,
        8481.85, 8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55,
        8512.9, 8496.25, 8600.65, 8881.1, 9340.85,
    ];



    // Convertendo para preço por arroba (1 arroba = 15kg => 1 tonelada = 1000kg = 66.67 arrobas)
    const pricesPerArroba = pricesPerTon.map(price => parseFloat((price / 33.33).toFixed(2)));

    const data = [
        {
            name: 'Preço da Arroba (R$)',
            data: pricesPerArroba,
        },
    ];

    const labels = [
        '2017-11-13', '2017-11-14', '2017-11-15', '2017-11-16', '2017-11-17',
        '2017-11-20', '2017-11-21', '2017-11-22', '2017-11-23', '2017-11-24',
        '2017-11-27', '2017-11-28', '2017-11-29', '2017-11-30', '2017-12-01',
        '2017-12-04', '2017-12-05', '2017-12-06', '2017-12-07', '2017-12-08',
    ];

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
