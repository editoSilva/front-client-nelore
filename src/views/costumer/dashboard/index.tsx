import { useEffect, useState } from "react";
import { useDashboardStore } from "@/store/costumer/dashboard";
import { useSessionUser } from "@/store/authStore";
import Loading from '@/components/shared/Loading'
import Sumary from "./components/Sumary";
import InvestimentChart from "./components/InvestimentChart";
import CattleWeight from "./components/CattleWeight";
import FarmMaps from "./components/FarmMaps";
import HeaderAfiliate from "./components/HeaderAfiliate";
import SharedLink from "./components/SharedLink";


const Dashboard = () => {
  const { dashboard, fetchDashboard, isLoading} = useDashboardStore();
  const { user } = useSessionUser()

  console.log('user-teste', user.role)
  useEffect(() => {
    fetchDashboard()

  }, [fetchDashboard]); 

  return(
    <>
     <Loading loading={isLoading}>
     {dashboard && (
        <div className="flex flex-col gap-4">
         <HeaderAfiliate data={dashboard}/>

         {user.role === 'sponsor' && <SharedLink data={dashboard} />}
          {/* <SharedLink data={dashboard}/> */}
           <Sumary data={dashboard} />
         
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="md:col-span-1 xl:col-span-1 order-1">
                <InvestimentChart />
              </div>
              <div className="md:col-span-1 xl:col-span-1 order-1">
                <CattleWeight />
              </div>
              <div className="md:col-span-1 xl:col-span-1 order-1">
                <FarmMaps />
              </div>
           </div>
        </div>
     

    )}
        </Loading>
    </>
    
  );
};

export default Dashboard;
