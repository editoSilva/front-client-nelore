import { useEffect, useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import { useAuth } from '@/auth'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import PasswordInput from '@/components/shared/PasswordInput'
import classNames from '@/utils/classNames'
import { string, z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { ReactNode } from 'react'

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    passwordHint?: string | ReactNode
    confirmPasswordHint?: string | ReactNode
    setMessage?: (message: string) => void
}

type SignUpFormSchema = {
    name: string
    password: string
    email: string
    cpf: string
    phone: string
    confirmPassword: string
}



const validationSchema: ZodType<SignUpFormSchema> = z
    .object({
        email: z.string({ required_error: 'Por favor insira seu e-mail' }),
        name: z.string({ required_error: 'Por favor digite seu nome' }),
        cpf: z.string({ required_error: 'Por favor insira um cpf' }),
        phone: z.string({ required_error: 'Por favor digite seu telefone' }),
        password: z.string({ required_error: 'Digite uma senha por favor' }),

        confirmPassword: z.string({
            required_error: 'Confirmar senha necessária',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Senhas não estão iguais',
        path: ['confirmPassword'],
    })

const SignUpForm = (props: SignUpFormProps) => {
    const { disableSubmit = false, className, setMessage, passwordHint, confirmPasswordHint } = props

    const [isSubmitting, setSubmitting] = useState<boolean>(false)

    const [linkAfiliate, setLinkAviliate] = useState<string | null>('')

    const { signUp } = useAuth()

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<SignUpFormSchema>({
        defaultValues: {
            name: '',
            email: '',
            cpf: '',
            phone: '',
            password: '',
   
        },
        mode: 'onChange',
        resolver: zodResolver(validationSchema),
    })

    const onSignUp = async (values: SignUpFormSchema) => {
        const { name, password, email, phone, cpf } = values

        if (!disableSubmit) {

            const code = linkAfiliate 

            const data = {
                name,
                email,
                phone,
                cpf,
                code,
                password 
            }
            console.log('user', data)

            setSubmitting(true)
            const result = await signUp(data)

            if (result?.status === 'failed') {
                setMessage?.(result.message)
            }

        }
    }


    const handleLink = () => {

        const urlParams = new URLSearchParams(window.location.search)

        const code = urlParams.get('aff')

        setLinkAviliate(code)
        
    }


    useEffect(() => {
        handleLink()
    })
    return (
        <div className={className}>
            <Form onSubmit={handleSubmit(onSignUp)}>
                <FormItem
                    label="Nome"
                    invalid={Boolean(errors.name)}
                    errorMessage={errors.name?.message}
                >
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                placeholder="Nome"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Email"
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="email"
                                placeholder="Email"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="CPF"
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="cpf"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                placeholder="cpf"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Contato"
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                placeholder="Contato"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Senha"
                    invalid={Boolean(errors.password)}
                    errorMessage={errors.password?.message}
                    className={classNames(
                        passwordHint && 'mb-0',
                        errors.password?.message && 'mb-8',
                    )}
                >
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <PasswordInput
                                type="text"
                                placeholder="Senha"
                                autoComplete="off"
                            
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Confirmar Senha"
                    invalid={Boolean(errors.confirmPassword)}
                    errorMessage={errors.confirmPassword?.message}
                    className={classNames(
                        confirmPasswordHint && 'mb-0',
                        errors.confirmPassword?.message && 'mb-8',
                    )}
                >
                    <Controller
                        name="confirmPassword"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <PasswordInput
                                type="text"
                                placeholder="Senha"
                                autoComplete="off"
                            
                                {...field}
                            />
                        )}
                    />
                </FormItem>
          
                <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                >
                    {isSubmitting ? 'Creating Account...' : 'Cadastrar'}
                </Button>
            </Form>
        </div>
    )
}

export default SignUpForm
