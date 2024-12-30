import { Card } from "@/components/ui";

import TransactionsList from "../components/TransactionsList";

const Transactions = () => {  

    return(
        <Card>
            <h6>Depositos</h6>
            <TransactionsList />
        </Card>
    )
}


export default Transactions;

