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




const validationSchema: ZodType<ProfileSchema> = z.object({
    name: z.string().min(1, { message: 'First name required' }),
    cph: z.string().min(1, { message: 'Last name required' }),
    email: z
        .string()
        .min(1, { message: 'Email required' })
        .email({ message: 'Invalid email' }),
    dialCode: z.string().min(1, { message: 'Please select your country code' }),
    phone: z
        .string()
        .min(1, { message: 'Please input your mobile number' }),
    country: z.string().min(1, { message: 'Please select a country' }),
    address: z.string().min(1, { message: 'Addrress required' }),
    postcode: z.string().min(1, { message: 'Postcode required' }),
    city: z.string().min(1, { message: 'City required' }),

})

const CustomSelectOption = (
    props: OptionProps<CountryOption> & { variant: 'country' | 'phone' },
) => {
    return (
        <DefaultOption<CountryOption>
            {...props}
            customLabel={(data, label) => (
                <span className="flex items-center gap-2">
                    <Avatar
                        shape="circle"
                        size={20}
                        src={`/img/countries/${data.value}.png`}
                    />
                    {props.variant === 'country' && <span>{label}</span>}
                    {props.variant === 'phone' && <span>{data.dialCode}</span>}
                </span>
            )}
        />
    )
}

const CustomControl = ({ children, ...props }: ControlProps<CountryOption>) => {

    

    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Avatar
                    className="ltr:ml-4 rtl:mr-4"
                    shape="circle"
                    size={20}
                    src={`/img/countries/${selected.value}.png`}
                />
            )}
            {children}
        </Control>
    )
}



const SettingsProfile = () => {
    const [currentUser, setCurrentUser] = useState<User>();

    const { user } = useSessionUser()

    const { data, mutate } = useSWR(
        '/api/settings/profile/',
        () => apiGetSettingsProfile<GetSettingsProfileResponse>(),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )



  


    useEffect(() => {
        if (user) {
            setCurrentUser(user);
        }
    }, [user]); // Atualiza o estado quando 'user' mudar

console.log('currentUser', currentUser?.name)

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
    const dialCodeList = useMemo(() => {
        const newCountryList: Array<CountryOption> = JSON.parse(
            JSON.stringify(countryList),
        )

        return newCountryList.map((country) => {
            country.label = country.dialCode
            return country
        })
    }, [])

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

    const {
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        control,
    } = useForm<ProfileSchema>({
        resolver: zodResolver(validationSchema),
    })

    const tiposChavesPix = [
        { label: 'CPF', value: 'cpf' },
        { label: 'CNPJ', value: 'cnpj' },
        { label: 'Email', value: 'email' },
        { label: 'Telefone', value: 'telefone' },
        { label: 'Chave Aleatória', value: 'aleatoria' },
        { label: 'Evangélica', value: 'evangelica' }, // Exemplo de chave evangelica
      ];

      // Interface para os dados do formulário
            interface FormData {
                pixKeyType: PixKeyType;
            }
            
            interface MyFormProps {
                control: any; // O tipo de `control` pode ser ajustado de acordo com o seu uso
                errors: any; // Ajuste o tipo de erro conforme necessário
            }
            
      
    useEffect(() => {
        if (data) {
            reset(data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const onSubmit = async (values: ProfileSchema) => {
        await sleep(500)
        if (data) {
            mutate({ ...data, ...values }, false)
        }
    }

    return (
        <>
            <h4 className="mb-8">Informações Pessoais</h4>
           
           <div className=' mb-8 border-b border-s-slate-700 p-6'>
              
                <div className="grid md:grid-cols-2 gap-4">
                    <FormItem
                        label="Nome"
                       
                    >
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={user?.name|| ""}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    disabled={true}
                                    autoComplete="off"
                                    placeholder="Nome"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="cpf"
                    >
                        <Controller
                            name="cpf"
                            defaultValue={user?.cpf || ""}
                            control={control}
                            render={({ field }) => (

                                <InputMask
                                mask="999.999.999-99"
                                disabled={true}
                                value={field.value || ""}
                                onChange={field.onChange}
                            >
                                {(inputProps: string[]) => (
                                <Input
                                    {...inputProps}
                                    type="text"
                                    placeholder="CPF"
                                    autoComplete="off"
                                />
                                )}
                            </InputMask>
                              
                            )}
                        />
                    </FormItem>
                </div>
            
                <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Email"
                  
                >
                    <Controller
                        name="email"
                        defaultValue={user?.email || ""}
                        control={control}
                        render={({ field }) => (
                            <Input
                                disabled={true}
                                type="email"
                                autoComplete="off"
                                placeholder="Email"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                     
                    <FormItem
                        className="w-full"
                     
                      
                    >
                        <label className="form-label mb-2">Contato</label>
                        <Controller
                            name="phone"
                            defaultValue={user?.phone || ""}
                            control={control}
                            render={({ field }) => (
                                <InputMask
                                mask="(99) 99999-9999"
                                value={field.value || ""}
                                disabled={true}
                                onChange={field.onChange}
                            >
                                {(inputProps: string[]) => (
                                <Input
                                    {...inputProps}
                                    type="text"
                                    placeholder="Contato"
                                    autoComplete="off"
                                />
                                )}
                            </InputMask>
                            )}
                        />
                    </FormItem>
                    </div>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                <h4 className="mb-6">Dados Bancários</h4>

                <div>
                    <Alert showIcon type="warning" customIcon={<HiFire />}>
                        A sua chave PIX deve ser a vinculada ao cpf do cadastro, não sendo não efetuaremos pagamentos.
                    </Alert>
                </div>

                <div className="flex items-end gap-4 w-full mb-8  p-6">
                <FormItem>
                <label className="form-label mb-2">Tipo</label>
                <Controller
                name="pixKeyType" // Nome do campo do formulário
                control={control}
                render={({ field }) => (
                    <Select
                    options={tiposChavesPix.map((item) => ({
                        label: item.label,
                        value: item.value,
                    }))}
                    {...field}
                    className="w-[150px]"
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
                        className="w-full"
                        invalid={
                            Boolean(errors.phoneNumber) ||
                            Boolean(errors.dialCode)
                        }
                        errorMessage={errors.phoneNumber?.message}
                    >
                        <label className="form-label mb-2">Chave</label>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                                <NumericInput
                                    autoComplete="off"
                                    placeholder="Número"
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                    </FormItem>

                    
                </div>

                <div className="flex justify-end mb-6">
                    <Button
                        variant="solid"
                        type="submit"
                        loading={isSubmitting}
                    >
                       Enviar
                    </Button>
                </div>

                <h4 className="mb-6">Endereço</h4>
                <div className='mb-8'>
                    <Alert showIcon type="info" customIcon={<HiFire />}>
                            Mantenha seus dados atualizados, para que nossa equipe possa está lhe enviando, bonificações e brindes.
                    </Alert>
                </div>

                <FormItem
                    label="Cidade"
                    invalid={Boolean(errors.country)}
                    errorMessage={errors.country?.message}
                >
                    <Controller
                        name="country"
                        control={control}
                        render={({ field }) => (
                            <Select<CountryOption>
                                options={countryList}
                                {...field}
                                components={{
                                    Option: (props) => (
                                        <CustomSelectOption
                                            variant="country"
                                            {...(props as OptionProps<CountryOption>)}
                                        />
                                    ),
                                    Control: CustomControl,
                                }}
                                placeholder=""
                                value={countryList.filter(
                                    (option) => option.value === field.value,
                                )}
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Address"
                    invalid={Boolean(errors.address)}
                    errorMessage={errors.address?.message}
                >
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Address"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormItem
                        label="City"
                        invalid={Boolean(errors.city)}
                        errorMessage={errors.city?.message}
                    >
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="City"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Postal Code"
                        invalid={Boolean(errors.postcode)}
                        errorMessage={errors.postcode?.message}
                    >
                        <Controller
                            name="postcode"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="CEP"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                </div>
                <div className="flex justify-end">
                    <Button
                        variant="solid"
                        type="submit"
                        loading={isSubmitting}
                    >
                        Atualizar
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default SettingsProfile
