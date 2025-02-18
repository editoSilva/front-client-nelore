import CommisionsList from "./components/CommisionsList";
import CommisionsListActionTools from "./components/CommisionsListActionTools";
import CommisionsListTableTools from "./components/CommisionsListTableTools";
import { AdaptiveCard, Container } from "@/components/shared";


const Commission = () => {
    
    return (
        <Container>
        <AdaptiveCard>
            <div className="flex flex-col gap-4">
   
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <h3>Comissões</h3>
                    <CommisionsListActionTools />
                </div>
                <CommisionsListTableTools />
                <CommisionsList />
            </div>
        </AdaptiveCard>
        </Container>
    )
}


export default Commission;