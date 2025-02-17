import { AdaptiveCard, Container } from "@/components/shared";
import CattleCards from "./components/CattleCards";
import { Card } from "@/components/ui";
import { useCattleStore } from "@/store/costumer/cattle";
import { useEffect, useState } from "react";
import Loading from '@/components/shared/Loading'
import { Investment } from "@/@types/costumer/catte/CattleType"; // Corrigido o nome aqui

const Invest = () => {
    const { cattes, fetchCattles, isLoading } = useCattleStore();
    const [catte, setCatte] = useState<Investment[]>([]); // Corrigido o nome aqui

    useEffect(() => {
        fetchCattles();
    }, [fetchCattles]); // Evita loops desnecessários

    useEffect(() => {
        if (cattes?.data) {
            setCatte(cattes.data); // Evita atribuir `undefined`
        }
    }, [cattes]);

    return (
        <>
        <Loading loading={isLoading}>
        {cattes && (
       
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-1xl font-bold mb-4">Nosso Plantel</h3>
                       
                    </div>
                    <div className="flex flex-wrap gap-4 justify-start">
                    {catte.map((cattleItem) => (
                <CattleCards key={cattleItem.id} cattle={cattleItem} />
              
            ))}
              </div>
                    
                </div>
        
    
          )}
          </Loading>
      </>
    );
};

export default Invest;
