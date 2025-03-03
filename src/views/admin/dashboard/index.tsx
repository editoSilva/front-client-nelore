import { useStoreDashboard } from "@/store/admin/dashboard";
import { useEffect } from "react";
import Loading from '@/components/shared/Loading'
import { useAuth } from "@/auth";
import { Card } from "@/components/ui";
import Alert from '@/components/ui/Alert'
import { HiFire } from 'react-icons/hi'

import TopCard from "./components/CardTop";


 const Dashboard = () => {
  
    const { user } = useAuth();   

  
    const {cardTop, isLoading, fetchCardTop} = useStoreDashboard();

    useEffect(() => {
        fetchCardTop()
    },[])
   

    return (
        <>
            <Loading loading={isLoading}>
            <div>
            <Alert 
            showIcon 
            type="success" 
            customIcon={<HiFire />}
            className="mb-4"
            >
            Seja bem-vindo(ª): <span className="font-bold italic">{ user.name }</span>
            </Alert>
                 </div>
            <Card>
            <div className="flex items-center justify-between">
                <h4>Dashboard</h4>

              
            </div>

            <TopCard users={cardTop.users} deposits={cardTop.deposits} withdrawal={cardTop.withdrawal} investments={cardTop.investments} />
            </Card>

             

            </Loading>
        </>
    )
}


export default Dashboard;