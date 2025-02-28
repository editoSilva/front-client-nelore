import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useState, MouseEvent, ChangeEvent, useEffect,  useRef } from 'react'
import ReactQRCode from 'react-qr-code'
import {useTransactionStore } from "@/store/costumer/transactions";
import { DepositResponse, DepositType, WithdrawalType} from '@/@types/costumer/transaction/TransactionTypes'
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
  const [withDrawalAmount, setWithDrawalAmount] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [depositSuccess, setDepositSuccess] = useState<boolean>(false)
  const [expirationTime, setExpirationTime] = useState<number>(10 * 60) // 10 minutos em segundos
  const [ transaction, setTransaction ] = useState<Deposit>()

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRefs = useRef<NodeJS.Timeout | null>(null);


  const { 
    deposit, 
    featchTransactions, 
    tableData, 
    resetDeposit, 
    filterData,
    isLoading, 
    isDeposit, 
    message,
    featchStatusDeposit,
    errorWithDrawal,
    featchWithdrawal,
    statusWithDrawal
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

      }
  }, [deposit, transaction]);


  useEffect(() => {
    if (statusWithDrawal) {

   
        // resetDeposit()
        toast.push(
          <Notification title="Sucesso!" type="success">
          {message}
          </Notification>
        );

        // return () => {
        //   if (intervalRefs.current) {
        //     clearInterval(intervalRefs.current);
        //   }
        // };
        
        return 
    }
  }, [statusWithDrawal])


  useEffect(() => {
    if (errorWithDrawal) {

   
        // resetDeposit()
        toast.push(
          <Notification title="Alerta!" type="warning">
          {message}
          </Notification>
        );

        // return () => {
        //   if (intervalRefs.current) {
        //     clearInterval(intervalRefs.current);
        //   }
        // };
        
        return 
    }
  }, [errorWithDrawal])

  


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




  const handleWithDrawal = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)

    const dataAmount: WithdrawalType = {
        amount: withDrawalAmount
    }

    await featchWithdrawal(dataAmount) 

    

    setWithDrawalAmount('') 
    setLoading(isLoading) 

  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWithDrawalAmount(e.target.value)
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
    setWithDrawalAmount('')
    setDepositSuccess(false)
    setExpirationTime(10 * 60) // Resetando o tempo para 10 minutos
    onClose()
    resetDeposit()

    // console.log('deposit2', deposit)
  }

  return (
    <Dialog isOpen={open} onClose={handleClose} onRequestClose={handleClose}>
      <div className="p-6">
     
          <>
            {/* Exibe as informações de depósito antes do sucesso */}
            <h3 className="text-lg font-bold mb-4 text-center">💰 Realizar Saque</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Insira o valor desejado para realizar seu saque. Certifique-se de que as informações estão corretas antes de confirmar.
            </p>
            <div className="mb-6">
              <label htmlFor="depositAmount" className="block text-sm font-bold mb-2">
                Valor do Saque(R$)
              </label>
              <Input
                id="depositAmount"
                type="number"
                placeholder="Ex: 300.00"
                value={withDrawalAmount}
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
                    withDrawalAmount
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  }`}
                  onClick={handleWithDrawal}
                  disabled={!withDrawalAmount || loading}
                >
                  Confirmar Saque
                </Button>
              </div>
            )}
          </>
        
      </div>
    </Dialog>
  )
}

export default ModalDeposit
