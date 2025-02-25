import { useState, useEffect, useRef, useCallback, MouseEvent, ChangeEvent } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import ReactQRCode from 'react-qr-code'
import { useTransactionStore } from "@/store/costumer/transactions";
import { DepositType, DepositResponse } from '@/@types/costumer/transaction/TransactionTypes'
import Notification from '@/components/ui/Notification';
import toast from '@/components/ui/toast';

interface ModalDepositProps {
  open: boolean;
  onClose: () => void;
}

interface Deposit {
  transaction_id: string;
  success: boolean;
  content: string;
  base_64: string;
}

const ModalDeposit = ({ open, onClose }: ModalDepositProps) => {
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [depositSuccess, setDepositSuccess] = useState<boolean>(false);
  const [expirationTime, setExpirationTime] = useState<number>(10 * 60);
  const [transaction, setTransaction] = useState<Deposit | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const statusIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const messageShown = useRef(false);

  const {
    featchDeposit,
    deposit,
    featchTransactions,
    tableData,
    resetDeposit,
    filterData,
    isLoading,
    featchStatusDeposit,
    statusDepoist
  } = useTransactionStore();

  // Atualiza o contador de tempo
  useEffect(() => {
    if (depositSuccess) {
      intervalRef.current = setInterval(() => {
        setExpirationTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [depositSuccess]);

  // Resetar estado ao fechar o modal
  useEffect(() => {
    if (!open) {
      resetDeposit();
      clearInterval(statusIntervalRef.current!);
    }
  }, [open, resetDeposit]);

  // Atualiza estado ao mudar `deposit`
  useEffect(() => {
    if (deposit) {
      setDepositSuccess(true);
      setTransaction(deposit.data);
      featchStatusDeposit(deposit.data);
      startStatusPolling(deposit.data);
    }
  }, [deposit]);

  // Verifica se o pagamento foi concluído
  useEffect(() => {
    if (statusDepoist.status === 'paid' && !messageShown.current) {
      messageShown.current = true;
      clearInterval(statusIntervalRef.current!);
      onClose();
      toast.push(
        <Notification title="Sucesso!" type="success">
          {`Pagamento efetuado!`}
        </Notification>
      );
    }
  }, [statusDepoist.status, onClose]);

  // Função para iniciar o polling do status do pagamento
  const startStatusPolling = useCallback((data: Deposit) => {
    if (statusIntervalRef.current) clearInterval(statusIntervalRef.current);

    statusIntervalRef.current = setInterval(async () => {
      await featchStatusDeposit(data);
    }, 3000);
  }, [featchStatusDeposit]);

  // Função para processar o depósito
  const handleDeposit = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const dataAmount: DepositType = { amount: depositAmount };
    await featchDeposit(dataAmount);

    setDepositAmount('');
    setLoading(false);
  };

  // Atualiza o valor do depósito
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDepositAmount(e.target.value);
  };

  // Copiar link de pagamento
  const handleCopyLink = () => {
    if (transaction?.content) {
      navigator.clipboard.writeText(transaction.content);
      toast.push(
        <Notification title="Sucesso!" type="success">
          {`Link copiado com sucesso!`}
        </Notification>
      );
    }
  };

  // Formata o tempo para exibição
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Resetar estados ao fechar o modal
  const handleClose = () => {
    setDepositAmount('');
    setDepositSuccess(false);
    setExpirationTime(10 * 60);
    onClose();
    resetDeposit();
  };

  return (
    <Dialog isOpen={open} onClose={handleClose} onRequestClose={handleClose}>
      <div className="p-6">
        {depositSuccess && transaction ? (
          <div className="text-center">
            <h3 className="text-lg font-bold mb-4">💰 Falta bem pouco para investir!</h3>
            <div className="flex justify-center items-center mb-4">
              <ReactQRCode value={transaction.content} size={256} />
            </div>
            <p className="text-sm text-gray-500 mb-4">Escaneie o QR Code ou copie o link para efetuar o pagamento.</p>
            <Input value={transaction.content} disabled className="w-full bg-gray-800 border border-gray-600 rounded-md mb-4" />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md" onClick={handleCopyLink}>
              Copiar Link de Pagamento
            </Button>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Tempo restante para o pagamento:</p>
              <p className="text-xl font-bold text-green-600">{formatTime(expirationTime)}</p>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold mb-4 text-center">💰 Realizar Depósito</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Insira o valor desejado para realizar seu depósito. Certifique-se de que as informações estão corretas antes de confirmar.
            </p>
            <div className="mb-6">
              <label htmlFor="depositAmount" className="block text-sm font-bold mb-2">
                Valor do Depósito (R$)
              </label>
              <Input id="depositAmount" type="number" placeholder="Ex: 300.00" value={depositAmount} className="w-full bg-gray-800 border border-gray-600 rounded-md" onChange={handleInputChange} />
            </div>
            <div className="flex justify-center items-center space-x-4">
              <Button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md" onClick={handleClose}>
                Cancelar
              </Button>
              <Button className={`px-4 py-2 rounded-md ${depositAmount ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`} onClick={handleDeposit} disabled={!depositAmount || loading}>
                Confirmar Depósito
              </Button>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
};

export default ModalDeposit;
