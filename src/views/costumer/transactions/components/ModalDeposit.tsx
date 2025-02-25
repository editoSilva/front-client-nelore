import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useState, MouseEvent, ChangeEvent, useEffect,  useRef } from 'react'
import ReactQRCode from 'react-qr-code'
import {useTransactionStore } from "@/store/costumer/transactions";
import { DepositResponse, DepositType} from '@/@types/costumer/transaction/TransactionTypes'
import Notification from '@/components/ui/Notification';
import toast from '@/components/ui/toast';
import { number } from 'zod'


interface ModalDepositProps {
  open: boolean;
  onClose: () => void;
}

interface Deposit  {
  transaction_id: string,
  success: boolean,
  content: string,
  base_64: string
}

const ModalDeposit = ({ open, onClose }: ModalDepositProps) => {
  const [depositAmount, setDepositAmount] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [depositSuccess, setDepositSuccess] = useState<boolean>(false)
  const [expirationTime, setExpirationTime] = useState<number>(10 * 60) // 10 minutos em segundos
  const [ transaction, setTransaction ] = useState<Deposit>()

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRefs = useRef<NodeJS.Timeout | null>(null);

  const messageShown = useRef(false);

  const { 
    featchDeposit, 
    deposit, 
    featchTransactions, 
    tableData, 
    resetDeposit, 
    filterData,
    isLoading, 
    isDeposit, 
    featchStatusDeposit,
    statusDepoist
  } = useTransactionStore();


  useEffect(() => {
    if (depositSuccess) {
      
        intervalRef.current = setInterval(() => {
          setExpirationTime((prevTime) => {
            if (prevTime <= 0) {
              clearInterval(intervalRef.current!);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
      }
    
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [depositSuccess]);

  useEffect(() => {
    if (!open) {
      resetDeposit();
      featchTransactions(tableData, filterData)

      return () => {
        if (intervalRefs.current) {
          clearInterval(intervalRefs.current);
        }
      };
    }
  }, [open, tableData, featchTransactions, resetDeposit, filterData]);

  useEffect(()=> {
    if(isDeposit) {
        // setDepositSuccess(isDeposit) 
    }
  },[isDeposit])

  useEffect(() => {
      if(open) {
        setDepositSuccess(false) 
      }
  }, [open, resetDeposit])

  useEffect(() => {
    if (depositSuccess) {
        // handleStatusDeposit()
        featchTransactions(tableData, filterData)
    }
  }, [depositSuccess, deposit, tableData, featchTransactions, filterData]);

  useEffect(() => {
    
      if(deposit) {
        setDepositSuccess(true);
        setTransaction(deposit.data)
        featchStatusDeposit(deposit.data)
        setIntervalDesposit(deposit.data)
      }
  }, [deposit, transaction]);


  useEffect(() => {
    if (statusDepoist.status === 'paid' && !messageShown.current) {

        messageShown.current = true; 

        onClose()
        // resetDeposit()
        toast.push(
          <Notification title="Sucesso!" type="success">
          {`Pagamento efetuado!`}
          </Notification>
        );

        // return () => {
        //   if (intervalRefs.current) {
        //     clearInterval(intervalRefs.current);
        //   }
        // };
        
        return 
    }
  }, [statusDepoist.status, onClose])

const setIntervalDesposit = (data: Deposit) => {
 
  intervalRefs.current = setInterval(async () => {
      await featchStatusDeposit(data)
  }, 3000);


    // Apenas inicia o intervalo se o status ainda não for "paid"

    // if()
    // intervalRefs.current = setInterval(async () => {
    //   try {
    //     if (statusDepoist.status === 'paid') {

    //       if (intervalRefs.current) {
    //         clearInterval(intervalRefs.current); // Limpa o intervalo
    //       }
    //       return;
    //     } else {
        
    //       await featchStatusDeposit(data) //handleStatusDeposit(transaction); // Atualiza o status na store
     
    //     }
    //   } catch (error) {
    //     console.error('Erro ao verificar o status do depósito:', error);
  
    //     if (intervalRefs.current) {
    //       clearInterval(intervalRefs.current); // Limpa o intervalo em caso de erro
    //     }
    //   }
    // }, 3000);
  
    // // Limpa o intervalo ao desmontar o componente ou quando a dependência muda
    // return () => {
    //   if (intervalRefs.current) {
    //     clearInterval(intervalRefs.current);
    //   }
    // };
}

// useEffect(() => {
//   console.log('deposito', statusDepoist);

//   if (statusDepoist?.status === 'paid') {
//     // Interrompe o intervalo (se houver)
//     if (intervalRefs.current) {
//       clearInterval(intervalRefs.current);
//     }

//     // Executa as ações necessárias
//     featchTransactions(tableData, filterData);
//     onClose();

//     toast.push(
//       <Notification title="Sucesso!" type="success">
//         {`Pagamento efetuado!`}
//       </Notification>
//     );




  const handleDeposit = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)

    const dataAmount: DepositType = {
        amount: depositAmount
    }

    await featchDeposit(dataAmount) 

    

    setDepositAmount('') 
    setLoading(isLoading) 

  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDepositAmount(e.target.value)
  }

  const handleCopyLink = () => {

    
    if (deposit.data.content) {
        navigator.clipboard.writeText(deposit.data.content);
        toast.push(
          <Notification title="Sucesso!" type="success">
              {`Link copiado com sucesso!`}
          </Notification>
      )
      }

   
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  // Resetar estados ao fechar o modal
  const handleClose = () => {
    setDepositAmount('')
    setDepositSuccess(false)
    setExpirationTime(10 * 60) // Resetando o tempo para 10 minutos
    onClose()
    resetDeposit()

    // console.log('deposit2', deposit)
  }

  return (
    <Dialog isOpen={open} onClose={handleClose} onRequestClose={handleClose}>
      <div className="p-6">
        {depositSuccess ? (
          // Exibe mensagem de agradecimento após o sucesso
          <div className="text-center">
            <h3 className="text-lg font-bold mb-4">💰 Falta bem puco para investir!</h3>

            <div className="flex justify-center items-center mb-4">
              <ReactQRCode value={deposit.data.content} size={256} />
            </div>
            <p className="text-sm text-gray-500 mb-4">Escaneie o QR Code ou copie o link para efetuar o pagamento.</p>

            <Input
              value={deposit.data.content}
              disabled
              className="w-full bg-gray-800  border border-gray-600 rounded-md mb-4"
            />
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              onClick={handleCopyLink}
            >
              Copiar Link de Pagamento
            </Button>

            <div className="mt-4">
              <p className="text-sm text-gray-500">Tempo restante para o pagamento:</p>
              
              <p className="text-xl font-bold text-green-600">{formatTime(expirationTime)}</p>
            </div>
          </div>
        ) : (
          <>
            {/* Exibe as informações de depósito antes do sucesso */}
            <h3 className="text-lg font-bold mb-4 text-center">💰 Realizar Depósito</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Insira o valor desejado para realizar seu depósito. Certifique-se de que as informações estão corretas antes de confirmar.
            </p>
            <div className="mb-6">
              <label htmlFor="depositAmount" className="block text-sm font-bold  mb-2">
                Valor do Depósito (R$)
              </label>
              <Input
                id="depositAmount"
                type="number"
                placeholder="Ex: 300.00"
                value={depositAmount}
                className="w-full bg-gray-800  border border-gray-600 rounded-md"
                onChange={handleInputChange}
              />
            </div>

            {loading ? (
              // Exibe o indicador de carregamento enquanto o depósito está sendo processado
              <div className="flex justify-center items-center mb-4">
                <div className="w-12 h-12 border-4 border-t-4 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="flex justify-center items-center space-x-4">
                <Button
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
                <Button
                  className={`px-4 py-2 rounded-md ${
                    depositAmount
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  }`}
                  onClick={handleDeposit}
                  disabled={!depositAmount || loading}
                >
                  Confirmar Depósito
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Dialog>
  )
}

export default ModalDeposit
