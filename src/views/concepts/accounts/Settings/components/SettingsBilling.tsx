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

const typeOptions: TypeOptions[] = [
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
    const [sendDocs, setSendDocs] = useState<boolean>(false)
    const [awaitAproveDocs, setAwaitAproveDocs] = useState<boolean>(false)
    const [docsAproved, sedDocsAproved] = useState<boolean>(false)

    useEffect(() => {
        featchPerfil()
    }, [])

    useEffect(() => {
        if (!perfil?.data?.documents || Object.keys(perfil.data.documents).length === 0) {
            setSendDocs(true)
        } else {
            setSendDocs(false)
            if (perfil?.data?.documents?.status === 'pending') {
                setAwaitAproveDocs(true)
            } else {
                setAwaitAproveDocs(false)
            }

            if (perfil?.data?.documents?.status === 'approved') {
                sedDocsAproved(true)
            }
        }
    }, [perfil])

    const resizeImage = (file: File, maxWidth: number, maxHeight: number, quality = 0.7): Promise<File> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (event) => {
                const img = new Image()
                img.src = event.target?.result as string
                img.onload = () => {
                    const canvas = document.createElement('canvas')
                    let width = img.width
                    let height = img.height

                    if (width > maxWidth || height > maxHeight) {
                        const scale = Math.min(maxWidth / width, maxHeight / height)
                        width *= scale
                        height *= scale
                    }

                    canvas.width = width
                    canvas.height = height
                    const ctx = canvas.getContext('2d')
                    ctx?.drawImage(img, 0, 0, width, height)

                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                resolve(new File([blob], file.name, { type: 'image/jpeg' }))
                            } else {
                                reject(new Error('Falha ao processar imagem'))
                            }
                        },
                        'image/jpeg',
                        quality
                    )
                }
            }
            reader.onerror = (error) => reject(error)
        })
    }

    const handleUpload = async (files: FileList | null, type: 'front' | 'back' | 'selfie') => {
        if (files && files.length > 0) {
            const file = files[0]
            try {
                const resizedFile = await resizeImage(file, 800, 800) // Redimensiona a imagem
                if (type === 'front') {
                    setDocumentFront(resizedFile)
                } else if (type === 'back') {
                    setDocumentBack(resizedFile)
                } else if (type === 'selfie') {
                    setSelfie(resizedFile)
                }
            } catch (error) {
                console.error('Erro ao redimensionar a imagem:', error)
            }
        }
    }

    const handleSubmitDocuments = async () => {
        if (!typeDocument || !documentFront || !documentBack || !selfie) {
            console.warn('Preencha todos os campos antes de enviar.')
            return
        }

        const formData = new FormData()
        formData.append('document_type', typeDocument)
        formData.append('document_file_path', documentFront)
        formData.append('document_file_path_verse', documentBack)
        formData.append('selfie_file_path', selfie)

        try {
            await fetchDocumentments(formData)
            await featchPerfil()
            console.log('Documentos enviados com sucesso!')
        } catch (error) {
            console.error('Erro ao enviar documentos:', error)
        }
    }

    const tip = <p className="mt-2">Envie apenas jpeg ou png (max 1000kb)</p>

    return (
        <div>
            {sendDocs && (
                <Alert showIcon className="mb-12">
                    Ative a sua conta, enviando a documentação!
                </Alert>
            )}

            {awaitAproveDocs && (
                <Alert showIcon className="mb-12" type="info">
                    Seus documentos já foram enviados. Aguardando Aprovação...
                </Alert>
            )}

            {docsAproved && (
                <Alert showIcon className="mb-4" type="success">
                    Documentação Aprovada. Conta destravada para saques.
                </Alert>
            )}

            {!awaitAproveDocs && !docsAproved && (
                <div>
                    <h4 className="mb-4">Documentos</h4>

                    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl mb-5 p-6">
                        <Select isSearchable={false} placeholder="Selecione?" options={typeOptions} onChange={(selected) => setTypeDocument(selected.value)} />
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl mb-5 p-6">
                        <Upload className="mb-8" uploadLimit={1} onChange={(fileList) => handleUpload(fileList, 'front')} tip={tip}>
                            <Button variant="solid" icon={<HiOutlineCloudUpload />}>
                                Enviar Frente do documento
                            </Button>
                        </Upload>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 mb-5">
                        <Upload uploadLimit={1} tip={tip} onChange={(file) => handleUpload(file, 'back')}>
                            <Button variant="solid" icon={<HiOutlineCloudUpload />}>
                                Enviar Verso do documento
                            </Button>
                        </Upload>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl mb-5 p-6">
                        <Upload uploadLimit={1} tip={tip} onChange={(file) => handleUpload(file, 'selfie')}>
                            <Button variant="solid" icon={<HiOutlineCloudUpload />}>
                                Enviar Self com o documento
                            </Button>
                        </Upload>
                    </div>

                    <div>
                        <Button variant="solid" block onClick={handleSubmitDocuments} disabled={!(typeDocument && documentFront && documentBack && selfie) || isLoading}>
                            {isLoading ? <span className="flex items-center">Enviando...</span> : 'Enviar'}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SettingsBilling
