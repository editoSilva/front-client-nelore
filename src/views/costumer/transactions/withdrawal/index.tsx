import AdaptiveCard from "@/components/shared/AdaptiveCard";
import TransactionListActionTools from "./components/TransactionListActionTools";
import TransactionListTableTools from "./components/TransactionListTableTools";
import TransactionsList from "./components/TransactionsList";
import Container from "@/components/shared/Container";




const WithdrawalTransaction= () => {  

    return(
    
<Container>
<AdaptiveCard>
    <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h3>Saques</h3>
            <TransactionListActionTools />
        </div>
        <TransactionListTableTools />
        <TransactionsList />
    </div>
</AdaptiveCard>
</Container>
    )
}


export default WithdrawalTransaction;