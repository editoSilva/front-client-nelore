import { Card } from "@/components/ui";

import TransactionsList from "../components/TransactionsList";

import TransactionListActionTools from "../components/TransactionListActionTools";
import { AdaptiveCard, Container } from "@/components/shared";
import TransactionListTableTools from "../components/TransactionListTableTools";

const Transactions = () => {  

    return(
    
<Container>
<AdaptiveCard>
    <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h3>Depósitos</h3>
            <TransactionListActionTools />
        </div>
        <TransactionListTableTools />
        <TransactionsList />
    </div>
</AdaptiveCard>
</Container>
    )
}


export default Transactions;

