import ReffersList from "./components/ReffersList";
import ReffersListActionTools from "./components/ReffersListActionTools";
import { AdaptiveCard, Container } from "@/components/shared";
import ReffersListTableTools from "./components/ReffersListTableTools";

const Referrer = () => {
    return (
        <Container>
        <AdaptiveCard>
            <div className="flex flex-col gap-4">
   
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <h3>Afiliados</h3>
                    <ReffersListActionTools />
                </div>
                <ReffersListTableTools />
                <ReffersList />
            </div>
        </AdaptiveCard>
        </Container>
    )   
}

export default Referrer;