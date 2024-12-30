import { Card } from "@/components/ui";
import { DashboardTypes } from "@/@types/costumer/dashboard/DashboardTypes";
import InputGroup from '@/components/ui/InputGroup'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { TbUnlink } from "react-icons/tb";
import { FaCopy } from "react-icons/fa";
import Notification from '@/components/ui/Notification';
import toast from '@/components/ui/toast';

type SharedProps = {
    data: DashboardTypes
}



const SharedLink = (data: SharedProps) => {

    const handleCopyAffiliateLink = () => {
        if (data.data?.affiliateLink) {
          navigator.clipboard.writeText(data.data.affiliateLink);
          toast.push(
            <Notification title="Sucesso!" type="success">
                {`Link copiado com sucesso!`}
            </Notification>,
        )
        }
      };

    return(
        <Card>
            <h5 className="mb-4">Link de Indicação</h5>
            <InputGroup size="lg"className="mb-4" >
                <InputGroup.Addon><TbUnlink /></InputGroup.Addon>
                <Input placeholder="Small Input" value={data.data.affiliateLink} disabled />
                <Button variant="solid" onClick={handleCopyAffiliateLink}><FaCopy /></Button>
            </InputGroup>
          
         <p className="bg-green-950 p-2 text-slate-50 rounded">Indique amigos e ganhe! <b> <span >Você tem {data.data.visited === null ? '0' : data.data.visited} visitas ao seu link.</span></b></p>
        </Card>
    )
      
}


export default SharedLink;