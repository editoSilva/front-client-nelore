import { AdaptiveCard, Container } from '@/components/shared';
import Loading from '@/components/shared/Loading';
import { useStoreuser } from '@/store/admin/users';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FormItem, Form } from '@/components/ui/Form';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { undefined, z } from 'zod';
import type { ZodType } from 'zod';
import { Button, Input } from '@/components/ui';
import { UserType } from '@/@types/admin/users/UsersTypes';
import Notification from '@/components/ui/Notification';
import toast from '@/components/ui/toast';

export type FormSchema = {
    id?: string,
    email: string;
    name: string;
    cpf: string;
    phone: string;
    balance: number
    balance_network: number
    balance_invest: number
    balance_withdrawl: number
};

const validationSchema: ZodType<FormSchema> = z.object({
    email: z.string().min(1, { message: 'Obrigatório' }).email({ message: 'Email Inválido' }),
    name: z.string().min(1, { message: 'Obrigatório' }),
    cpf: z.string().min(1, { message: 'Obrigatório' }),
    phone: z.string().min(1, { message: 'Obrigatório' }),
    balance: z.number(),
    id: z.string(),
    balance_network: z.number(),
    balance_invest: z.number(),
    balance_withdrawl: z.number(),
});

const DetailUser = () => {
    const { featchUser, user, isLoading, isSubmitting, featchUpdateUser, isMessageSuccess, message } = useStoreuser();
    const { id } = useParams();
    const userId: string | null = id ?? null; // Converte undefined para null

    useEffect(() => {
        if (userId) {
            featchUser(userId); // Chamar a função corretamente com `userId`
        }
      }, [userId, featchUser]); // Garantir que `fetchUser` seja dependência também
    

 
    const {
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm<FormSchema>({
        defaultValues: {
            id: '',
            email:'',
            name: '',
            cpf: '',
            phone: '',
            balance: 0,
            balance_network: 0,
            balance_invest: 0,
            balance_withdrawl: 0,
        },
        // resolver: zodResolver(validationSchema),
    });

    const onSubmit = (values: FormSchema) => {

        values.id = userId || ''

        console.log('val', values)
        featchUpdateUser(values)
    };

    useEffect(() => {
        if (user) {
            setValue("email", user.data.email);
            setValue("name", user.data.name);
            setValue("cpf", user.data.cpf);
            setValue("phone", user.data.phone);
            setValue("balance", user.data.wallet.balance); // Garantir que seja número
            setValue("balance_network", Number(user.data.wallet.balance_network)); // Garantir que seja número
            setValue("balance_invest", Number(user.data.wallet.balance_invest)); // Garantir que seja número
            setValue("balance_withdrawl", Number(user.data.wallet.balance_withdrawl)); // Garantir que seja número
            }
      }, [user,  setValue]);

              
   if (isMessageSuccess) {
        toast.push(
            <Notification title="Sucesso!" type="success" duration={3000}>
                {message}
            </Notification>,
        )
    }


    return (
        <>
            <Loading loading={isLoading}>
                <Container>
                    <h4 className='mb-6'>
                        {user?.data?.name} - ({user?.data?.role === 'sponsor' ? 'Duplicador' : 'Cliente'})
                    </h4>
                    <AdaptiveCard className="h-full">
                        {!isLoading && user?.data && (
                            <>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <h6 className='mb-4'>Dados Pessoais</h6>
                                    <div className="flex flex-auto h-full p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                            <div className="p-6 rounded-lg shadow-md w-full">
                                                <FormItem label="Nome" invalid={Boolean(errors.name)} errorMessage={errors.name?.message}>
                                                    <Controller
                                                        name="name"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Input type="text" autoComplete="off" placeholder="Nome..." {...field} />
                                                        )}
                                                    />
                                                </FormItem>

                                                <FormItem label="CPF" invalid={Boolean(errors.cpf)} errorMessage={errors.cpf?.message}>
                                                    <Controller
                                                        name="cpf"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Input type="text" autoComplete="off" placeholder="CPF..." {...field} />
                                                        )}
                                                    />
                                                </FormItem>
                                            </div>

                                            <div className="p-6 rounded-lg shadow-md w-full">
                                                <FormItem label="Email" invalid={Boolean(errors.email)} errorMessage={errors.email?.message}>
                                                    <Controller
                                                        name="email"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Input type="email" autoComplete="off" placeholder="Email" {...field} />
                                                        )}
                                                    />
                                                </FormItem>

                                                <FormItem label="Contato" invalid={Boolean(errors.phone)} errorMessage={errors.phone?.message}>
                                                    <Controller
                                                        name="phone"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Input type="text" autoComplete="off" placeholder="Telefone" {...field} />
                                                        )}
                                                    />
                                                </FormItem>
                                            </div>
                                        </div>
                                    </div>

                                    <h6 className='mb-4'>Saldos</h6>
                                    <div className="flex flex-auto h-full p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                                            <div className="p-6 rounded-lg shadow-md w-full">
                                                <FormItem label="Saldo Investimento">
                                                    <Controller
                                                        name="balance"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Input type="number" autoComplete="off" placeholder="Saldo" {...field} 
                                                           
                                                            />
                                                        )}
                                                    />
                                                </FormItem>
                                            </div>

                                            <div className="p-6 rounded-lg shadow-md w-full">
                                                <FormItem label="Saldo Rede">
                                                    <Controller
                                                        name="balance_network"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Input type="number" autoComplete="off" placeholder="Saldo" {...field} disabled />
                                                        )}
                                                    />
                                                </FormItem>
                                            </div>

                                            <div className="p-6 rounded-lg shadow-md w-full">
                                                <FormItem label="Retorno Investimento">
                                                    <Controller
                                                        name="balance_invest"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Input type="number" autoComplete="off" placeholder="Saldo" {...field} disabled />
                                                        )}
                                                    />
                                                </FormItem>
                                            </div>

                                            <div className="p-6 rounded-lg shadow-md w-full">
                                                <FormItem label="Disponível Saque">
                                                    <Controller
                                                        name="balance_withdrawl"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Input type="number" autoComplete="off" placeholder="Saldo" {...field} disabled />
                                                        )}
                                                    />
                                                </FormItem>
                                            </div>
                                        </div>
                                    </div>

                                    <FormItem>
                                        <Button className='mt-10' type="submit" variant="solid" loading={isSubmitting}>
                                            Atualizar
                                        </Button>
                                    </FormItem>
                                </Form>
                            </>
                        )}
                    </AdaptiveCard>
                </Container>
            </Loading>
        </>
    );
};

export default DetailUser;
