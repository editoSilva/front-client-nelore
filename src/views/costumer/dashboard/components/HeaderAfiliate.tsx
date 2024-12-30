
import Card from '@/components/ui/Card'
import { DashboardTypes } from '@/@types/costumer/dashboard/DashboardTypes';
import OverviewAfiliate from './OverviewAfiliate';

type DashboardProps = {
    data: DashboardTypes
}

const HeaderAfiliate = (data: DashboardProps) => {
    return(
        <Card>
             <h6 className="mb-4">Olá, <b>{data.data.name}</b></h6>
             
              <OverviewAfiliate data={data.data}/>
         
        </Card>
    )
}


export default HeaderAfiliate;