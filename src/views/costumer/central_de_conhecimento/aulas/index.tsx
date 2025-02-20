
import { AdaptiveCard, Container } from "@/components/shared"
import CardAulas from "./components/CardAulas";

const Aulas = () => {
    return(
        
        <AdaptiveCard>
            <Container>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-xl font-semibold">Aulas</h3>
                </div>
        <CardAulas/>
            </div>
            </Container>
        </AdaptiveCard>
        
    )
}



export default Aulas;