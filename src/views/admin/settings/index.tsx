import { AdaptiveCard } from "@/components/shared";
import FormSettings from "./components/FormSettings";

const Settings = () => {
        return (
            <>
              <h4 className="mb-8">Configurações</h4>
           <AdaptiveCard className="w-full  flex  justify-center">
          
        <div className="w-full h-full flex">
            <FormSettings  />
        </div>
    </AdaptiveCard>

            </>
        )
}

export default Settings;