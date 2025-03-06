import { AdaptiveCard } from "@/components/shared";
import FormSettings from "./components/FormSettings";

const Settings = () => {
        return (
            <>
              <h4 className="mb-8">Configurações</h4>
           <AdaptiveCard className="w-full">
     
            <FormSettings  />
      
    </AdaptiveCard>

            </>
        )
}

export default Settings;