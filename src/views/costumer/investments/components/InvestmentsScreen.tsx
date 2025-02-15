import Card from '@/components/ui/Card'
import { HiCheckCircle, HiFire } from 'react-icons/hi'
import Progress from '@/components/ui/Progress'
import { useInvestmentStore }  from '@/store/costumer/investment'
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button'
import Table from '@/components/ui/Table'
import Tag from '@/components/ui/Tag'


import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'

const InvestmentsScreen = () => {
    const { Tr, Th, Td, THead, TBody } = Table
    const { investment, fetchInvestments } = useInvestmentStore();

    useEffect(()=> {
        fetchInvestments()
    }, [])

    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const onDialogOk = (e: MouseEvent) => {
        console.log('onDialogOk', e)
        setIsOpen(false)
    }


    

  const cards = [
    {
      title: 'INVG58140220256',
      description: 'Texto de exemplo para o card 1.\nQuebra de linha dentro do card.',
    },
    {
      title: 'INVG49140220255',
      description: 'Texto de exemplo para o card 2.\nOutra linha de exemplo.',
    },
    {
      title: 'INVG56140220255',
      description: 'Texto de exemplo para o card 3.\nMais uma linha aqui.',
    },
    {
        title: 'INVG581402202',
        description: 'Texto de exemplo para o card 1.\nQuebra de linha dentro do card.',
      },
      {
        title: 'INVG4914022025',
        description: 'Texto de exemplo para o card 2.\nOutra linha de exemplo.',
      },
      {
        title: 'INVG5614022025',
        description: 'Texto de exemplo para o card 3.\nMais uma linha aqui.',
      },
      {
        title: 'INVG5814022025',
        description: 'Texto de exemplo para o card 1.\nQuebra de linha dentro do card.',
      },
      {
        title: 'INVG49140220',
        description: 'Texto de exemplo para o card 2.\nOutra linha de exemplo.',
      },
      {
        title: 'INVG56140220255518IAA5NTGPKK8S',
        description: 'Texto de exemplo para o card 3.\nMais uma linha aqui.',
      },
  ]

  const headerExtraContent = (
    <span className="flex items-center">
        <span className="mr-1 font-semibold">Status:</span>
        <span className="text-emerald-500 text-xl">
            <HiCheckCircle />
        </span>
    </span>
)

  return (
    <>
    <div className="flex flex-col gap-4">
         <h3 className="text-1xl font-bold mb-4">Meus Investimentos</h3>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card
          
          header={{
          
            content: 'Em Andamento',
            extra: headerExtraContent,
        }}
            key={index}
            clickable
            onClick={(e) => console.log('Card Clickable', e)}
     
          >
            <h5 className="p-2 text-lg font-bold break-words mb-4 whitespace-pre-wrap">
            {card.title}
            </h5>
         
            <div className="grid grid-cols-2 gap-2">
                <p className="p-2 break-words whitespace-pre-wrap">Cotas</p>
                <p className="p-2 break-words whitespace-pre-wrap"><b>5</b></p>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <p className="p-2 break-words whitespace-pre-wrap">Investido</p>
                <p className="p-2 break-words whitespace-pre-wrap">R$ 460,00</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <p className="p-2 break-words whitespace-pre-wrap">Retorno</p>
                <p className="p-2 break-words whitespace-pre-wrap">R$ 854,00</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <p className="p-2 break-words whitespace-pre-wrap">Margem ganho</p>
                <p className="p-2 break-words whitespace-pre-wrap">20%</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <p className="p-2 break-words whitespace-pre-wrap">Retorno</p>
                <p className="p-2 break-words whitespace-pre-wrap">R$ 854,00</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-5">
                <p className="p-2 break-words whitespace-pre-wrap">Criação</p>
                <p className="p-2 break-words whitespace-pre-wrap">Criado há 18 hours ago</p>
            </div>
            
            <div>
                <Progress percent={30} />
            </div>
            <div className='mt-5'>
            <Button 
            variant="solid" 
            block 
            icon={<HiFire />}
            onClick={() => openDialog()}
            >
                Histórico Investimento
            </Button>
            </div>
           
          </Card>
        ))}
      </div>
    </div>
    </div>

    <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">INVG5614022025</h5>
 
                <Table compact>
                <THead>
                    <Tr>
                        <Th>Data</Th>
                        <Th>Total Investido</Th>
                        <Th>Retorno</Th>
                        <Th>%</Th>
                    </Tr>
                </THead>
                <TBody>
                    <Tr>
                        <Td>Alfreds </Td>
                        <Td>Maria Anders</Td>
                        <Td>Germany</Td>
                        <Td>
                            <Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 p-2 dark:text-emerald-100 border-0 rounded">
                                2%
                            </Tag>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>Centro comerc</Td>
                        <Td>Francisco Chang</Td>
                        <Td>Mexico</Td>
                        <Td>
                            <Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 p-2 dark:text-emerald-100 border-0 rounded">
                                2%
                            </Tag>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>Ernst Handel</Td>
                        <Td>Roland Mendel</Td>
                        <Td>
                          teste
                        </Td>
                        <Td>
                            <Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 p-2 dark:text-emerald-100 border-0 rounded">
                                2%
                            </Tag>
                        </Td>
                    </Tr>
                </TBody>
            </Table>
          
            </Dialog>


    </>
  )
}

export default InvestmentsScreen
