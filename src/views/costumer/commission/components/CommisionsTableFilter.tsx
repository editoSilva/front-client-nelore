import { useState } from 'react'
import Button from '@/components/ui/Button'
import DatePicker from '@/components/ui/DatePicker'
import Drawer from '@/components/ui/Drawer'
import Badge from '@/components/ui/Badge'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { components } from 'react-select'
import { Form, FormItem } from '@/components/ui/Form'
import { useCommisionStore } from "@/store/costumer/commision";
import { TbFilter } from 'react-icons/tb'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'


type FormSchema = {
    date: [Date, Date]
    status: string

}




const validationSchema: ZodType<FormSchema> = z.object({
    date: z.tuple([z.date(), z.date()]),
    status: z.string(),

})

const CommisionsTableFilter = () => {
    const [filterIsOpen, setFilterIsOpen] = useState(false)

    const { filterData, setFilterData } = useCommisionStore()

    const { handleSubmit, control } = useForm<FormSchema>({
        defaultValues: filterData,
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = (values: FormSchema) => {     
        setFilterData(values)
 
        setFilterIsOpen(false)
    }

    return (
        <>
            <Button icon={<TbFilter />} onClick={() => setFilterIsOpen(true)}>
                Filtro
            </Button>
            <Drawer
                title="Filtro"
                isOpen={filterIsOpen}
                onClose={() => setFilterIsOpen(false)}
                onRequestClose={() => setFilterIsOpen(false)}
            >
                <Form
                    className="h-full"
                    containerClassName="flex flex-col justify-between h-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <FormItem label="Data Transação">
                            <div className="flex items-center gap-2">
                                <Controller
                                    name="date"
                                    control={control}
                                    render={({ field }) => (
                                        <DatePicker.DatePickerRange
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>
                        </FormItem>
                     
                     
                    </div>
                    <Button variant="solid" type="submit">
                        Pesquisar
                    </Button>
                </Form>
            </Drawer>
        </>
    )
}

export default CommisionsTableFilter
