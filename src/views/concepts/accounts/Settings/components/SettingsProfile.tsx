import { useMemo, useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import InputMask from "react-input-mask";
import Input from '@/components/ui/Input'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import { Form, FormItem } from '@/components/ui/Form'
import NumericInput from '@/components/shared/NumericInput'
import { countryList } from '@/constants/countries.constant'
import { components } from 'react-select'
import type { ControlProps, OptionProps } from 'react-select'
import { apiGetSettingsProfile } from '@/services/AccontsService'
import Alert from '@/components/ui/Alert'
import { HiFire } from 'react-icons/hi'
import sleep from '@/utils/sleep'
import useSWR from 'swr'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'

import type { ZodType } from 'zod'
import type { GetSettingsProfileResponse } from '../types'
import { useSessionUser } from '@/store/authStore'
import { usePerfilSotre } from '@/store/costumer/perfil';

type ProfileSchema = {
    name: string
    cpf: string
    email: string
    dialCode: string
    phone: string
    img: string
    country: string
    address: string
    postcode: string
    city: string
}



type AddrressSchema = {
    address: string
    neighborhood: string 
    number: string 
    city: string 
    state: string
    postal_code: string  
    complement: string

}

type PixKeySchema = {
    pix_key: string, 
    key_type: string 

}

type CountryOption = {
    label: string
    dialCode: string
    value: string
}

type User = {
    userId?: string | null
    avatar?: string | null
    name?: string | null
    cpf?: string | null
    phone?: string | null
    code?: string | null
    email?: string | null
    role?: string | null
    authority?: string[]
}
const { Control } = components

// const validationSchemaAdress:  ZodType<AddrressSchema> = z.object({

//     address: z.string(),
//     neighborhood: z.string(),
//     number: z.string(),
//     city: z.string(),
//     state: z.string(),
//     postal_code: z.string(),
//     complement: z.string()
  
  
// })

// const validationSchemaPixKey:  ZodType<PixKeySchema> = z.object({

//     pix_key:   z.string().min(1, { message: 'Selecione um tipo de chave!' }),
//     key_type:  z.string().min(1, { message: 'Digite a sua chave!' }),
    
  
// })




// const validationSchema: ZodType<ProfileSchema> = z.object({
//     name: z.string().min(1, { message: 'First name required' }),
//     cph: z.string().min(1, { message: 'Last name required' }),
//     email: z
//         .string()
//         .min(1, { message: 'Email required' })
//         .email({ message: 'Invalid email' }),
//     dialCode: z.string().min(1, { message: 'Please select your country code' }),
//     phone: z
//         .string()
//         .min(1, { message: 'Please input your mobile number' }),
//     country: z.string().min(1, { message: 'Please select a country' }),
//     address: z.string().min(1, { message: 'Addrress required' }),
//     postcode: z.string().min(1, { message: 'Postcode required' }),
//     city: z.string().min(1, { message: 'City required' }),

// })

// const CustomSelectOption = (
//     props: OptionProps<CountryOption> & { variant: 'country' | 'phone' },
// ) => {
//     return (
//         <DefaultOption<CountryOption>
//             {...props}
//             customLabel={(data, label) => (
//                 <span className="flex items-center gap-2">
//                     {/* <Avatar
//                         shape="circle"
//                         size={20}
//                         src={`/img/countries/${data.value}.png`}
//                     /> */}
//                     {props.variant === 'country' && <span>{label}</span>}
//                     {props.variant === 'phone' && <span>{data.dialCode}</span>}
//                 </span>
//             )}
//         />
//     )
// }

const CustomControl = ({ children, ...props }: ControlProps<CountryOption>) => {

    

    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Avatar
                    className="ltr:ml-4 rtl:mr-4"
                    shape="circle"
                    size={20}
                    src='https://i0.wp.com/protetor.app/wp-content/uploads/2024/01/Logo-Pix-Png.webp?ssl=1'
                />
            )}
            {children}
        </Control>
    )

    console.log('type_pix', selected)
}



const SettingsProfile = () => {
    const [currentUser, setCurrentUser] = useState<User>();
    const { featchPerfil, perfil } = usePerfilSotre();

    const [isSubmittingAddress, setSubmittingAddress] = useState<boolean>(false)
    const [isSubmittingPix, setSubmittingPix] = useState<boolean>(false)
    const { user } = useSessionUser()

    // const { data, mutate } = useSWR(
    //     '/api/settings/profile/',
    //     () => apiGetSettingsProfile<GetSettingsProfileResponse>(),
    //     {
    //         revalidateOnFocus: false,
    //         revalidateIfStale: false,
    //         revalidateOnReconnect: false,
    //     },
    // )



    useEffect(() => {
        featchPerfil();
        
    }, []); // Atualiza o estado quando 'user' mudar


    const {
        handleSubmit: handleSubmitPix,
        control: controlPix,
        formState: { errors: errorsPix },
        setValue: setValuePix,
    } = useForm<PixKeySchema>({
        // resolver: zodResolver(validationSchemaPixKey),
        defaultValues: {
            pix_key: "", // Defina um valor padrão inicial
            key_type: "",
          },
    });

    const {
        handleSubmit: handleSubmitAddress,
        control: controlAddress,
        formState: { errors: errorsAddress },
        control,
        setValue: setValueAddress
    } = useForm<AddrressSchema>({
        defaultValues: {
            address: "",
            neighborhood: "",
            number: "",
            city: "",
            state: "",
            postal_code: "",
            complement: "",
          },
        // resolver: zodResolver(validationSchemaAdress),
    })



    useEffect(() => {
        if (perfil) {
            setValuePix("key_type", perfil.data.pixKey.key_type);
            setValuePix("pix_key", perfil.data.pixKey.pix_key);
            setValueAddress("address", perfil.data.adress.address);
            setValueAddress("neighborhood", perfil.data.adress.neighborhood);
            setValueAddress("number", perfil.data.adress.number);
            setValueAddress("city", perfil.data.adress.city);
            setValueAddress("state", perfil.data.adress.state);
            setValueAddress("postal_code", perfil.data.adress.postal_code);
            setValueAddress("complement", perfil.data.adress.complement);
        }
      }, [perfil, setValuePix, setValueAddress]);

    useEffect(() => {
        if (user) {
            setCurrentUser(user);
        }
    }, [user]); // Atualiza o estado quando 'user' mudar



    const typePix = () => {
        return [
            {
                label: 'CPF',
                value: 'cpf',
            },
            {
                label: 'E-mail',
                value: 'email',
            },
            {
                label: 'Telefone',
                value: 'telefone',
            },
            {
                label: 'Aleatória',
                value: 'aleatoria',
            },
        ]
    }


    // const beforeUpload = (files: FileList | null) => {
    //     let valid: string | boolean = true

    //     const allowedFileType = ['image/jpeg', 'image/png']
    //     if (files) {
    //         for (const file of files) {
    //             if (!allowedFileType.includes(file.type)) {
    //                 valid = 'Please upload a .jpeg or .png file!'
    //             }
    //         }
    //     }

    //     return valid
    // }

  
  


      // Função de envio do Formulário de Endereço
      const onSubmitAddress = (data: AddrressSchema) => {

        setSubmittingAddress(true);
        console.log("Endereço enviado:", data);
    };

      // Função de envio do Formulário de PIX
      const onSubmitPix = (data: AddrressSchema) => {

        setSubmittingPix(true)
        console.log("PIX enviado:", data);
    };


    const tiposChavesPix = [
        { label: 'CPF', value: 'cpf' },
        { label: 'CNPJ', value: 'cnpj' },
        { label: 'Email', value: 'email' },
        { label: 'Telefone', value: 'telefone' },
        { label: 'Chave Aleatória', value: 'aleatoria' },
      ];
            


    return (
        <>
            
            <h4 className="mb-8">Informações Pessoais</h4>
           
                <div className=' mb-8 border-b border-s-slate-700 p-6'>
                
                    <div className="grid md:grid-cols-2 gap-4">
                          {/* Nome */}
                            <FormItem label="Nome">
                                <Input
                                    type="text"
                                    disabled={true}
                                    autoComplete="off"
                                    placeholder="Nome"
                                    defaultValue={user?.name || ""}
                                />
                            </FormItem>

                            {/* CPF */}
                            <FormItem label="CPF">
                                <InputMask mask="999.999.999-99"   defaultValue={user?.cpf || ""}  disabled>
                                    {(inputProps: string[]) => (
                                        <Input {...inputProps} type="text" placeholder="CPF" autoComplete="off" disabled  />
                                    )}
                                </InputMask>
                            </FormItem>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Email */}
                            <FormItem label="Email">
                                <Input
                                    type="email"
                                    disabled
                                    autoComplete="off"
                                    placeholder="Email"
                                    defaultValue={user?.email || ""}
                                />
                            </FormItem>

                            {/* Contato */}
                            <FormItem className="w-full">
                                <label className="form-label mb-2">Contato</label>
                                <InputMask mask="(99) 99999-9999"   defaultValue={user?.phone || ""} disabled >
                                    {(inputProps: string[]) => (
                                        <Input {...inputProps} type="text" placeholder="Contato" autoComplete="off" disabled  />
                                    )}
                                </InputMask>
                        </FormItem>
                    </div>
                </div>
           
                <h4 className="mb-6">Dados Bancários</h4>

                <div>
                    <Alert showIcon type="warning" customIcon={<HiFire />}>
                        A sua chave PIX deve ser a vinculada ao cpf do cadastro, não sendo não efetuaremos pagamentos.
                    </Alert>
                </div>
                <Form onSubmit={handleSubmitPix(onSubmitPix)}>
                <div className="flex flex-col sm:flex-row items-end gap-4 w-full mb-8 p-6">
                {/* Start Form PIX KEY */}
            
                <FormItem 
                  invalid={Boolean(errorsPix.key_type)}
                  errorMessage={errorsPix.key_type?.message}
                className="w-full sm:w-[20%]">
                    <label className="form-label mb-2">Tipo da Chave</label>
                    <Controller
                    name="key_type" // Nome do campo do formulário
                  
                    control={controlPix}
                    render={({ field }) => (
                        <Select
                        options={tiposChavesPix.map((item) => ({
                            label: item.label,
                            value: item.value,
                        }))}
                        {...field}
                 
                        components={{
                            Control: CustomControl, // Continuamos utilizando CustomControl
                        }}
                        placeholder="Tipo"
                        value={tiposChavesPix.find((option) => option.value === field.value)} // Define o valor selecionado
                        onChange={(option: PixKeyType) => field.onChange(option)} // Atualiza o valor no formulário
                        />
                    )}
                    />
                </FormItem>
                            
                <FormItem 
                    invalid={Boolean(errorsPix.pix_key)}
                    errorMessage={errorsPix.pix_key?.message}
                    className="w-full sm:w-[80%]"
                    >
                    <label className="form-label mb-2">Chave</label>
                    <Controller
                        name="pix_key"
                        control={controlPix}
                        render={({ field }) => (
                        <NumericInput
                            autoComplete="off"
                            placeholder="Ex. 01158478575"
                            value={field.value || ''} 
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                        />
                        )}
                    />
            </FormItem>
            {/* End Form PIX KEY */}
</div>



                <div className="flex justify-end mb-6">
                    <Button
                        variant="solid"
                        type="submit"
                        loading={isSubmittingPix}
                    >
                       Enviar
                    </Button>
                </div>
                </Form>

                <Form onSubmit={handleSubmitAddress(onSubmitAddress)}>
                <h4 className="mb-6">Endereço</h4>
                <div className='mb-8'>
                    <Alert showIcon type="info" customIcon={<HiFire />}>
                            Mantenha seus dados atualizados, para que nossa equipe possa está lhe enviando, bonificações e brindes.
                    </Alert>
                </div>


              
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormItem
                        label="Rua"
                        invalid={Boolean(errorsAddress.address)}
                        errorMessage={errorsAddress.address?.message}
                    >
                        <Controller
                            name="address"
                            control={controlAddress}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Ex. Rua B"
                                    value={field.value || ''}
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label="Número"
                        invalid={Boolean(errorsAddress.number)}
                        errorMessage={errorsAddress.number?.message}
                    >
                        <Controller
                            name="number"
                            control={controlAddress}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                   
                                    autoComplete="off"
                                    placeholder="Ex. 98"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Bairro"
                        invalid={Boolean(errorsAddress.neighborhood)}
                        errorMessage={errorsAddress.neighborhood?.message}
                    >
                        <Controller
                            name="neighborhood"
                            control={controlAddress}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Ex. Margarida"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                </div>
              
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <FormItem
                        label="Complemento"
                        // invalid={Boolean(errorsAddress.city)}
                        // errorMessage={errorsAddress.city?.message}
                    >
                        <Controller
                            name="complement"
                            control={controlAddress}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Ex Quadra 5 Casa B"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Cidade"
                        invalid={Boolean(errorsAddress.city)}
                        errorMessage={errorsAddress.city?.message}
                    >
                        <Controller
                            name="city"
                            control={controlAddress}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Ex. Goiânia"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>


                    <FormItem
                        label="Estado"
                        invalid={Boolean(errorsAddress.city)}
                        errorMessage={errorsAddress.city?.message}
                    >
                        <Controller
                            name="state"
                            control={controlAddress}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Ex. Goiais"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                   
                    <FormItem
                        label="CEP"
                        invalid={Boolean(errorsAddress.postal_code)}
                        errorMessage={errorsAddress.postal_code?.message}
                    >
                        <Controller
                            name="postal_code"
                            control={control}
                            render={({ field }) => (
                                <InputMask
                                mask="99999-999"
                                // disabled={true}
                                value={field.value || ""}
                                onChange={field.onChange}
                            >
                                {(inputProps: string[]) => (
                                <Input
                                    {...inputProps}
                                    type="text"
                                    placeholder="Ex. 74005-010"
                                    autoComplete="off"
                                />
                                )}
                            </InputMask>
                            )}
                        />
                    </FormItem>
                </div>
                <div className="flex justify-end">
                    <Button
                        variant="solid"
                        type="submit"
                        loading={isSubmittingAddress}
                    >
                        Atualizar
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default SettingsProfile
