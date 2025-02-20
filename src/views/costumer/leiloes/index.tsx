import { AdaptiveCard, Container } from "@/components/shared"
import CardLeilao from "./components/CardLeilao";


const Leiloes = () => {


    return(
        
        <AdaptiveCard>
            <Container>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-xl font-semibold">Leilões</h3>
                </div>

            <CardLeilao/>

            </div>
            </Container>
        </AdaptiveCard>
        
    )
   

}


export default Leiloes;