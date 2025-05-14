import Card from '@/components/ui/Card'
import { HiCheckCircle, HiFire } from 'react-icons/hi'
import Progress from '@/components/ui/Progress'
import { useInvestmentStore }  from '@/store/costumer/investment'
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button'
import Table from '@/components/ui/Table'
import Tag from '@/components/ui/Tag'

import { Investment, YieldHistory } from '@/@types/costumer/investiment/InvestMentTypes'


import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'


const InvestmentsScreen = () => {
    const { Tr, Th, Td, THead, TBody } = Table
    const { investments, fetchInvestments } = useInvestmentStore();
    const [investmentList, setInvestmentList] = useState<Array<Investment>>([]);
    const [yieldHistories, setYieldHistories] = useState<Array<YieldHistory>>([])
    const [investCode, sentInvestCode]  = useState<string>('')


    const handleInvestmentUpdate = () => {
      if (investments?.data) {

        setInvestmentList(investments.data);
      }
    };

    const handleYieldHistories = (data: YieldHistory[], investCode: string) => {
      setYieldHistories(data)
      sentInvestCode(investCode)
        console.log('YieldHistories', data)
    }

    useEffect(() => {
      handleInvestmentUpdate();
    }, [investments]);



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
    {investments.data.length === 0 ? (
      <div className="p-6 min-h-screen flex items-center justify-center">
      <div className="max-w-md  p-8 shadow-lg rounded-lg text-center">
        <HiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Nenhum Investimento Encontrado</h1>
        <p className="text-gray-600">Você ainda não possui investimentos cadastrados.</p>
      </div>
    </div>
    ) : (
      <>
      <div className="flex flex-col gap-4">
      <h3 className="text-1xl font-bold mb-4">Meus Investimentos</h3>
                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
  
   <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
     {investmentList.map((card, index) => (
       <Card
       
       header={{
       
         content: card.rate_withdrawl < 100 ? 'Em Andamento' : 'Concluído',
         extra: headerExtraContent,
        }}
         key={index}
         clickable
         onClick={(e) => console.log('Card Clickable', e)}
  
       >
         <h5 className="p-2 text-lg font-bold break-words mb-4 whitespace-pre-wrap">
         {card.investment_code}
         </h5>
      
         <div className="grid grid-cols-2 gap-2">
             <p className="p-2 break-words whitespace-pre-wrap">Cotas</p>
             <p className="p-2 break-words whitespace-pre-wrap"><b>{card.shares_acquired}</b></p>
         </div>
         <div className="grid grid-cols-2 gap-2">
             <p className="p-2 break-words whitespace-pre-wrap">Investido</p>
             <p className="p-2 break-words whitespace-pre-wrap">R$ {card.total_invested}</p>
         </div>
         <div className="grid grid-cols-2 gap-2">
             <p className="p-2 break-words whitespace-pre-wrap">Retorno</p>
             <p className="p-2 break-words whitespace-pre-wrap">R$ {card.total_redeem}</p>
         </div>
         <div className="grid grid-cols-2 gap-2">
             <p className="p-2 break-words whitespace-pre-wrap">Margem ganho</p>
             <p className="p-2 break-words whitespace-pre-wrap">{card.return_percentage}%</p>
         </div>
        
         <div className="grid grid-cols-2 gap-2 mb-5">
             <p className="p-2 break-words whitespace-pre-wrap">Criação</p>
             <p className="p-2 break-words whitespace-pre-wrap"><b>{card.days}</b></p>
         </div>
         
         <div>
             <Progress percent={card.rate_withdrawl} />
         </div>
         <div className='mt-5'>
           { card.yieldHistories.length > 0
             && (  <Button 
               variant="solid" 
               block 
               icon={<HiFire />}
               onClick={() => {
                 openDialog();
                 handleYieldHistories(card.yieldHistories, card.investment_code);
             }}
               >
                   Histórico Investimento
               </Button>)
           }
       
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
          <h5 className="mb-4">{investCode}</h5>

          {/* Adiciona scroll interno aqui */}
          <div className="max-h-[400px] overflow-y-auto pr-2">
              <Table compact>
                  <THead>
                      <Tr>
                          <Th>Data</Th>
                          <Th>Total Investido</Th>
                          <Th>Ganho do Dia</Th>
                          <Th>%</Th>
                      </Tr>
                  </THead>
                  <TBody>
                      {yieldHistories.map((card, index) => (
                          <Tr key={index}>
                              <Td>{card.yield_date}</Td>
                              <Td>R$ {card.total_investment}</Td>
                              <Td>R$ {card.yield}</Td>
                              <Td>
                                  <Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 p-2 dark:text-emerald-100 border-0 rounded">
                                      {card.rate}%
                                  </Tag>
                              </Td>
                          </Tr>
                      ))}
                  </TBody>
              </Table>
          </div>
      </Dialog>
         </>
    )}

   


    </>
  )
}

export default InvestmentsScreen
