import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const CattleCards = () => {
    const cardFooter = (
        <div className="flex items-center">
            
            <Button variant="solid" block>
                INVESTIR
            </Button>
         
        </div>
    )

    const cardHeader = (
        <div className="rounded-tl-lg rounded-tr-lg overflow-hidden">
            <img src="https://www.lancerural.com.br/wp-content/uploads/2016/12/escneloreraca640.jpg" alt="card header" />
        </div>
    )

    return (
        <div className="max-w-xs float-left m-2">
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                header={{
                    content: cardHeader,
                    bordered: false,
                    className: 'p-0',
                }}
                footer={{
                    content: cardFooter,
                    bordered: false,
                }}
            >
               

                {/* Informações adicionais do boi */}
                <div className="mt-4">
                <div className="flex justify-between text-sm">
                        <span className="font-semibold">Disponiveis:</span>
                        <span>9</span>
                    </div>
                <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold">Raça:</span>
                        <span>Nelore</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold">Nome:</span>
                        <span>Boizão</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold">Preço:</span>
                        <span>R$ 8.000,00</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold">Idade:</span>
                        <span>24 meses</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="font-semibold">Fazenda:</span>
                        <span>Fazenda Boa Vista</span>
                    </div>
                    
                </div>
            </Card>
        </div>
    )
}

export default CattleCards
