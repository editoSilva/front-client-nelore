
import { AdaptiveCard, Container } from "@/components/shared";
import CattleCards from "./components/CattleCards";
import { Card } from "@/components/ui";


const Invest = () => {  

    return(
    
<Container>
<AdaptiveCard>
    <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h3>Invsita Agora</h3>
              
        </div>
        <Card>
        <CattleCards />
        <CattleCards />
        <CattleCards />
        <CattleCards />
        <CattleCards />
        <CattleCards />
        <CattleCards />
        <CattleCards />
        </Card>
      
    </div>
</AdaptiveCard>
</Container>
    )
}


export default Invest;