
import Button from '@/components/ui/Button'
import { TbCloudDownload } from 'react-icons/tb'
import { useReferrerStore } from "@/store/costumer/referrer";
import { CSVLink } from 'react-csv'

const CommisionsListActionTools = () => {
  
    const { referres } = useReferrerStore();
  
    return (
        <>
            <div className="flex flex-col md:flex-row gap-3 justify-end">
                <CSVLink
                    className="w-full md:w-auto"
                    filename="comissoes.csv"
                    data={referres.data}
                >
                    <Button
                        icon={<TbCloudDownload className="text-xl" />}
                        className="w-full md:w-auto"
                    >
                        Download
                    </Button>
                </CSVLink>
            </div>
        </>
       
    )
}

export default CommisionsListActionTools
