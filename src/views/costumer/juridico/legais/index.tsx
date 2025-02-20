import { AdaptiveCard, Container } from "@/components/shared"


const Legais = () => {


    return(
        
        <AdaptiveCard>
            <Container>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-xl font-semibold">Aspectos Legais</h3>
                </div>
    
            </div>
            </Container>
        </AdaptiveCard>
        
    )
   
}


export default Legais;