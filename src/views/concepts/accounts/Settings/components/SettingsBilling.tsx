
import Upload from '@/components/ui/Upload'
import Select from '@/components/ui/Select'

const colourOptions = [
    { value: 'cnh', label: 'CNH', color: '#00B8D9' },
    { value: 'rg', label: 'RG', color: '#0052CC' },
    { value: 'passaport', label: 'Passaporte', color: '#5243AA' },
  
]

const SettingsBilling = () => {
   

    const maxUploadFront = 1
    const maxUploadSelf = 1;

    const beforeUploadFront = (files: FileList | null, fileList: File[]) => {
        let valid: string | boolean = true

        const allowedFileType = ['image/jpeg', 'image/png']
        const maxFileSize = 500000

        if (fileList.length >= maxUploadFront) {
            return `You can only upload ${maxUploadFront} file(s)`
        }

        if (files) {
            for (const f of files) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }

                if (f.size >= maxFileSize) {
                    valid = 'Upload image cannot more then 500kb!'
                }
            }
        }

        return valid
    }

    const tip = <p className="mt-2">Envie apenas jpeg ou png (max 500kb)</p>
  
  
 
    return (
        <div>
            <h4 className="mb-4">Documentos</h4>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl mb-5 p-6">
            <Select
                isSearchable={false}
                placeholder="Documento?"
                options={colourOptions}
            />
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl mb-5 p-6">
            <h6 >Frente do documento</h6>
            <Upload className="mb-8"
                beforeUpload={beforeUploadFront}
                
                uploadLimit={maxUploadFront}
                tip={tip}
            />
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 mb-5">
             <h6 className="mb-8">Verso do documento</h6>
                <Upload
                    beforeUpload={beforeUploadFront}
                    
                    uploadLimit={maxUploadFront}
                    tip={tip}
                />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-xl mb-5 p-6">
                 <h6 className="mb-8">Self com o documento</h6>
                <Upload
                    beforeUpload={beforeUploadFront}
                    
                    uploadLimit={maxUploadSelf}
                    tip={tip}
                />
            </div>

            
     
        </div>
    )
}

export default SettingsBilling
