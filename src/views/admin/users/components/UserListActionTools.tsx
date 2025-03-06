import { useState } from 'react'
import Button from '@/components/ui/Button'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import { CSVLink } from 'react-csv'

import { useStoreuser } from '@/store/admin/users';


const UserListActionTools = () => {
  
    const { users } = useStoreuser();

    return (
        <>
     
         
     <div className="flex flex-col md:flex-row gap-3 justify-end mb-6">
    <CSVLink className="w-30" filename="users.csv" data={users.data}>
        <Button icon={<TbCloudDownload className="text-xl" />} className="w-full">
            Download
        </Button>
    </CSVLink>
</div>
        </>
       
    )
}

export default UserListActionTools
