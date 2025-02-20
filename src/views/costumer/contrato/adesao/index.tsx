import { AdaptiveCard, Container } from "@/components/shared"


const Contrato = () => {


    return(
        
        <AdaptiveCard>
            <Container>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-xl font-semibold">Contrato de Adesão</h3>
                </div>
    
            </div>
            </Container>
        </AdaptiveCard>
        
    )
   
}


export default Contrato;