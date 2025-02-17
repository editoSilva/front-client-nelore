import { AdaptiveCard, Container } from "@/components/shared";
import { Card } from "@/components/ui";
import { useParams } from "react-router-dom";
import { useCattleStore } from "@/store/costumer/cattle";
import { useEffect, useState } from "react";
import { InvestmentDetails, InvestMentQotas } from "@/@types/costumer/catte/CattleType";
import Notification from '@/components/ui/Notification';
import toast from '@/components/ui/toast';

const Invest = () => {  
    const { id } = useParams<{ id: string }>(); // Captura o parâmetro da URL
    const { featchCatteShow, catte_show, featchInvestCatte , statusInvest} = useCattleStore();

    const [investmentDetails, setInvestmentDetails] = useState<InvestmentDetails | null>(null);
    const [selectedQuotas, setSelectedQuotas] = useState<number[]>([]);

    useEffect(() => {
        if (id) {
            featchCatteShow(id); // Busca os dados ao carregar a página
        }
    }, [id, featchCatteShow]);

    useEffect(() => {
        if (statusInvest) {
            featchCatteShow(String(id)); // Busca os dados ao carregar a página

            toast.push(
                <Notification title="Sucesso!" type="success">
                {`Compra de cota com sucesso!`}
                </Notification>
              );
           
        }
    }, [statusInvest])


    useEffect(() => {
        if (catte_show?.data) {
            setInvestmentDetails(catte_show.data); // Atualiza o estado somente quando `catte_show` for alterado
        }
    }, [catte_show]);

    const toggleQuotaSelection = (quotaId: number) => {
        setSelectedQuotas((prev) =>
            prev.includes(quotaId) ? prev.filter((q) => q !== quotaId) : [...prev, quotaId]
        );
    };

    const submitInvestment  =   () => {
       
        const invest: InvestMentQotas =  {
            type: 'cattle',
            catte_id: String(id),
            shares: selectedQuotas
        }

        featchInvestCatte(invest)

        console.log('statusInvest', statusInvest)

    } 

    if (!investmentDetails) return <p>Carregando...</p>;

    return (
        <Container>
            <AdaptiveCard>
                <div className="flex flex-col gap-4">
                    {/* Título */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3 className="text-xl font-semibold">{investmentDetails.name}</h3>
                    </div>

                    {/* Imagem - Centralizada e sem cortes */}
                    {investmentDetails.images?.length > 0 && (
                        <div className="flex justify-center">
                            <img
                                src={investmentDetails.images[0].image}
                                alt={investmentDetails.name}
                                className="w-full max-w-lg aspect-[4/3] object-contain rounded-lg"
                            />
                        </div>
                    )}

                    {/* Informações do boi */}
                    <Card className="p-4">
                        <p><strong>Raça:</strong> {investmentDetails.breed}</p>
                        <p><strong>Fazenda:</strong> {investmentDetails.farm}</p>
                        <p><strong>Peso:</strong> {investmentDetails.weight} kg</p>
                        <p><strong>Preço por cota:</strong> R$ {investmentDetails.price_per_share}</p>
                        <p><strong>Total de cotas:</strong> {investmentDetails.total_shares}</p>
                        <p><strong>Cotas vendidas:</strong> {investmentDetails.shares_sold}</p>
                        <p><strong>Status:</strong> {investmentDetails.status === "selling" ? "À venda" : "Vendido"}</p>
                    </Card>

                    {/* Seleção de cotas */}
                    <div className="grid grid-cols-5 gap-2">
                        {investmentDetails.quotas.map((quota: Quotas) => (
                            <button
                                key={quota.id}
                                className={`p-2 rounded-lg text-center border ${
                                    selectedQuotas.includes(quota.id)
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200 text-black"
                                }`}
                                onClick={() => toggleQuotaSelection(quota.id)}
                            >
                                Cota - {quota.number}
                            </button>
                        ))}
                    </div>

                    {/* Botão de confirmar compra */}
                    <button
                        className="mt-4 p-3 bg-green-500 text-white  rounded-lg w-full"
                        disabled={selectedQuotas.length === 0}
                        onClick={submitInvestment}
                        
                    >
                        Comprar {selectedQuotas.length} cota(s)
                    </button>
                </div>
            </AdaptiveCard>
        </Container>
    );
};

export default Invest;
