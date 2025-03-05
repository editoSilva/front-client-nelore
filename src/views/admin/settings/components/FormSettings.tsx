import { SettingsType } from "@/@types/admin/settings/SettingsTypes";
import { FormItem, Input } from "@/components/ui";
import { useStoreSettings } from "@/store/admin/settings";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form"; // Não precisa importar o Form do react-hook-form
import Button from '@/components/ui/Button';
import Notification from '@/components/ui/Notification';
import toast from '@/components/ui/toast';

const FormSettings = () => {
    const { feachSettings, updateSettings, settings, isLoading, isMessageSuccess, message} = useStoreSettings();

    useEffect(() => {
        feachSettings();
    }, [feachSettings]);

    const {
        handleSubmit: handleSubmitSettings,
        control: controlSettings,
        formState: { errors: errorsSettings },
        setValue: setValueSettings,
    } = useForm<SettingsType>({
        defaultValues: {
            id: '1',
            withdrawal_invest_days: 0,
            withdrawal_fee: 0.00,
            max_invested_capital_percentage: 0.00,
            membership_fee: 0.00,
            min_withdrawal: 0.00,
            max_withdrawal: 0.00
        },
        mode: 'onChange'
    });

    useEffect(() => {
        if (settings) {
            setValueSettings("id", settings.data.id);
            setValueSettings("withdrawal_invest_days", settings.data.withdrawal_invest_days || 0);
            setValueSettings("withdrawal_fee", settings.data.withdrawal_fee || 0);
            setValueSettings("max_invested_capital_percentage", settings.data.max_invested_capital_percentage || 0);
            setValueSettings("membership_fee", settings.data.membership_fee || 0);
            setValueSettings("min_withdrawal", settings.data.min_withdrawal || 0);
            setValueSettings("max_withdrawal", settings.data.max_withdrawal || 0);
        }
    }, [settings, setValueSettings]);

    const onSubmitSettings =  (data: SettingsType) => {

       updateSettings(data)
       
    };

        
    // useEffect(() => {
        
    // })
   if (isMessageSuccess) {
    toast.push(
   <Notification title="Sucesso!" type="success" duration={4000}>
       {message}
   </Notification>,
   )
}

console.log('isMessageSuccess', isMessageSuccess)

    return (
        <form onSubmit={handleSubmitSettings(onSubmitSettings)}> {/* Usando o form padrão */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full p-10">
                <FormItem
                    label="Dias Retorno Investimento"
                    className="w-full"
                    invalid={Boolean(errorsSettings.withdrawal_invest_days)}
                >
                    <Controller
                        name="withdrawal_invest_days"
                        control={controlSettings}
                        render={({ field }) => (
                            <Input
                                type="number"
                                autoComplete="off"
                                placeholder="Ex. 45"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Taxa de Saque"
                    invalid={Boolean(errorsSettings.withdrawal_fee)}
                >
                    <Controller
                        name="withdrawal_fee"
                        control={controlSettings}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Ex. 5.00"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Retorno Máximo Investimento"
                    invalid={Boolean(errorsSettings.max_invested_capital_percentage)}
                >
                    <Controller
                        name="max_invested_capital_percentage"
                        control={controlSettings}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Ex. 20.00"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Taxa de Adesão"
                    invalid={Boolean(errorsSettings.membership_fee)}
                >
                    <Controller
                        name="membership_fee"
                        control={controlSettings}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Ex. 5.00"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Mínimo Saque"
                    invalid={Boolean(errorsSettings.min_withdrawal)}
                >
                    <Controller
                        name="min_withdrawal"
                        control={controlSettings}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Ex. 5.00"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Máximo Saque"
                    invalid={Boolean(errorsSettings.max_withdrawal)}
                >
                    <Controller
                        name="max_withdrawal"
                        control={controlSettings}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Ex. 5.00"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                {/* Botão que ocupa toda a largura no mobile e 1/3 no desktop */}
                <div className="col-span-1 md:col-span-3 flex ">
                    <Button
                        variant="solid"
                        type="submit"
                        className="w-full md:w-1/3 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-400 transition"
                        loading={isLoading}
                    >
                        Atualizar
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default FormSettings;
