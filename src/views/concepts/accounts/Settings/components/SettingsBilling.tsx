import Upload from '@/components/ui/Upload'
import Select from '@/components/ui/Select'
import Alert from '@/components/ui/Alert'
import { useEffect, useState } from 'react'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { usePerfilSotre } from '@/store/costumer/perfil'
import Button from '@/components/ui/Button'
import { UseDocumentStore } from '@/store/costumer/documents'


interface TypeOptions {
    value: string
    label: string
    color: string
}

const typeOptions:  TypeOptions[] = [
    { value: 'cnh', label: 'CNH', color: '#00B8D9' },
    { value: 'rg', label: 'RG', color: '#0052CC' },
    { value: 'passaport', label: 'Passaporte', color: '#5243AA' },
]


const SettingsBilling = () => {
    const { featchPerfil, perfil } = usePerfilSotre()
    const { fetchDocumentments, isLoading } = UseDocumentStore()



    const [typeDocument, setTypeDocument] = useState<string | null>('')
    const [documentFront, setDocumentFront] = useState<File | null>(null)
    const [documentBack, setDocumentBack] = useState<File | null>(null)
    const [selfie, setSelfie] = useState<File | null>(null)
    const [sendDocs, setSendDocs] = useState<boolean>(false);
    const [awaitAproveDocs, setAwaitAproveDocs]  = useState<boolean>(false);
    const [docsAproved, sedDocsAproved]  = useState<boolean>(false);

    // console.log('status', perfil?.data?.documents?.status)

    useEffect(() => {
        featchPerfil()
    }, [])

   

    useEffect(() => {
        // Verificar se 'documents' está vazio ou não
        if (!perfil?.data?.documents || Object.keys(perfil.data.documents).length === 0) {
          setSendDocs(true);
        } else {

          setSendDocs(false);
            if (perfil?.data?.documents?.status === 'pending') {

                // console.log('status interno', perfil?.data?.documents?.status)
                 setAwaitAproveDocs(true)

            } else {
                setAwaitAproveDocs(false)
            }

            if(perfil?.data?.documents?.status === 'approved') {
                    sedDocsAproved(true)
            }
        }
      }, [perfil]); // O efeito só será disparado quando 'perfil' mudar
    // if (perfil?.data?.documents && Object.keys(perfil.data.documents).length > 0 && perfil?.data?.documents?.status === 'pending') {
    //     setAwaitAproveDocs(true)
    // }

    const handleSubmitDocuments = async () => {
        if (!typeDocument || !documentFront || !documentBack || !selfie) {
            console.warn("Preencha todos os campos antes de enviar.");
            return;
        }
    
        // Verifica se os arquivos são do tipo File (caso venham de um input type="file")
        if (!(documentFront instanceof File) || !(documentBack instanceof File) || !(selfie instanceof File)) {
            console.error("Os documentos devem ser arquivos válidos.");
            return;
        }
    
        const formData = new FormData();
        formData.append("document_type", typeDocument);
        formData.append("document_file_path", documentFront);
        formData.append("document_file_path_verse", documentBack);
        formData.append("selfie_file_path", selfie);
    
        try {
            await fetchDocumentments(formData); // Envia os documentos
            await featchPerfil(); // Atualiza o perfil após o envio
            console.log("Documentos enviados com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar documentos:", error);
        }
    };
    

    const maxUploadFront = 1
    const maxUploadSelf = 1

    const beforeUploadFront = (files: FileList | null, fileList: File[]): string | true => {
        const allowedFileType = ['image/jpeg', 'image/png']
        const maxFileSize = 1000000000000000

        if (fileList.length >= maxUploadFront) {
            return `Você só pode enviar ${maxUploadFront} arquivo(s)`
        }

        if (files) {
            for (const f of files) {
                if (!allowedFileType.includes(f.type)) {
                    return 'Envie apenas arquivos .jpeg ou .png!'
                }
                if (f.size >= maxFileSize) {
                    return 'A imagem não pode ter mais de 1000kb!'
                }
            }
        }

        return true
    }


    const handleSelectChange = (selected: TypeOptions) => {
        setTypeDocument(selected.value); // Atualiza o valor selecionado
        console.log("Valor selecionado:", selected.value); // Exibe o valor selecionado no console
      };


      // Função para lidar com o upload e salvar no estado correto
      const handleUpload = (files: FileList | null, type: 'front' | 'back' | 'selfie') => {
        if (files && files.length > 0) {
            const file = files[0] // Pegando o primeiro arquivo do array
            if (file) {
                if (type === 'front') {
                    setDocumentFront(file)
                } else if (type === 'back') {
                    setDocumentBack(file)
                } else if (type === 'selfie') {
                    setSelfie(file)
                }
            }
        }
    }
    const isFormValid = !!(typeDocument && documentFront && documentBack && selfie);

    const tip = <p className="mt-2">Envie apenas jpeg ou png (max 1000kb)</p>
  
    return (
        <div>

        {sendDocs && (
                <Alert showIcon className="mb-12">
                Ative a sua conta, enviando a documentação!
                </Alert>
            )}

            {
                awaitAproveDocs && (
                    <Alert showIcon className="mb-12" type="info">
                        Seus documentos já foram enviados. Aguardando Aprovação...
                    </Alert>
                 
                )
            }

            { docsAproved && (
                 <Alert showIcon className="mb-4" type="success">
                 Documentação Aprovada. Conta destravada para saques.
             </Alert>
            )}
          
          { !awaitAproveDocs && !docsAproved && (
            <div>
                    <h4 className="mb-4">Documentos</h4>

                        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl mb-5 p-6">
                            <Select isSearchable={false} placeholder="Selecione?" 
                              options={typeOptions} 
                              onChange={handleSelectChange}
                            />
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl mb-5 p-6">

                            <Upload
                                className="mb-8"
                                beforeUpload={beforeUploadFront}
                                uploadLimit={maxUploadFront}
                                onChange={(fileList) => handleUpload(fileList, 'front')}
                                tip={tip}
                            >
                                <Button variant="solid" icon={<HiOutlineCloudUpload />} > Enviar Frente do documento</Button>
                                </Upload>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 mb-5">

                            <Upload
                                beforeUpload={beforeUploadFront}
                                uploadLimit={maxUploadFront}
                                tip={tip}
                                onChange={(file) => handleUpload(file, 'back')}
                            >
                                <Button variant="solid" icon={<HiOutlineCloudUpload />} > Enviar Verso do documento</Button>
                                </Upload>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl mb-5 p-6">
                        
                            <Upload
                                beforeUpload={beforeUploadFront}
                                uploadLimit={maxUploadSelf}
                                tip={tip}
                                onChange={(file) => handleUpload(file, 'selfie')}
                            >
                                <Button variant="solid" icon={<HiOutlineCloudUpload />} > Enviar Self com o documento</Button>
                            </Upload>
                        </div>

                        <div>
                        <Button variant="solid" block
                                    onClick={handleSubmitDocuments} // Usando `onClick` ao invés de `onSubmit`
                                    disabled={!isFormValid || isLoading}// Desativa o botão enquanto carrega
                        >
                             {isLoading ? (
                                <span className="flex items-center">
                                    Enviando...
                                </span>
                            ) : (
                                "Enviar"
                            )}
                        </Button>
                        </div>

            </div>
          )}
            
           
        </div>
    )
}

export default SettingsBilling


