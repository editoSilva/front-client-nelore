import { useNavigate } from "react-router-dom";
import Card from "@/components/ui/Card";
import { useState, useEffect } from 'react'
import Button from "@/components/ui/Button";
import { Investment } from "@/@types/costumer/catte/CattleType";
import { HiCheckCircle, HiFire} from 'react-icons/hi'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'

interface CattleCardProps {
  cattle: Investment;
}

const CattleCards = ({ cattle }: CattleCardProps) => {
  const navigate = useNavigate();

  const handleInvestir = () => navigate(`/castle/${cattle.id}`);

    const headerExtraContent = (
      <span className="flex items-center">
          <span className="mr-1 font-semibold"></span>
          <span className="text-emerald-500 text-xl">
              <HiCheckCircle />
          </span>
      </span>
  )

  const handleVideo = () => {
    setIsOpen(true)
  }

  const [dialogIsOpen, setIsOpen] = useState(false)


  const onDialogClose = (e: MouseEvent) => {
      console.log('onDialogClose', e)
      setIsOpen(false)
  }


  const [videoEmbedUrl, setVideoEmbedUrl] = useState('');

  // Função para extrair o ID do vídeo a partir da URL
  const getVideoId = (url: string) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };



  useEffect(() => {
    if (cattle?.videos?.[0]?.url) {
      const videoId = getVideoId(cattle.videos[0].url);
      if (videoId) {
        setVideoEmbedUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
      }
    }
  }, [cattle]);


  return (
    <>
   
    <div className="w-full sm:max-w-xs m-2">
      <Card
       
        clickable
        className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600"
        header={{
          content: cattle.batch,
          extra: headerExtraContent,
        }}
        footer={{
          content: (
            <div className="flex items-center">
              <Button 
              variant="solid" 
              block 
              onClick={handleInvestir}
               icon={<HiFire />}
              >
                INVESTIR
              </Button>
            </div>
          ),
          bordered: false,
        }}
      >

        <div className="relative rounded-t-lg overflow-hidden group" onClick={handleVideo}>
          <img
            src={cattle.images?.[0]?.image || "https://via.placeholder.com/300"}
            alt={cattle.name}
            className="w-full h-40 sm:h-48 object-cover transition duration-300 group-hover:brightness-50"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
            <svg
              className="w-12 h-12 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <div className="mt-3 space-y-2 text-sm">
          <InfoRow label="Disponíveis" value={cattle.total_shares} />
          <InfoRow label="Vendidos" value={cattle.shares_sold} />
          <InfoRow label="Raça" value={cattle.breed} />
          <InfoRow label="Lote" value={cattle.batch} />
          <InfoRow
            label="Preço @."
            value={new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(parseFloat(cattle.price_per_share))}
          />
          <InfoRow label="Local" value={cattle.farm} />
        </div>
      </Card>
    </div>

    <Dialog
      isOpen={dialogIsOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      className="w-[800px] h-[600px] flex flex-col justify-between"
    >
      <div className="w-full h-full flex flex-col p-6">
        <h5 className="mb-4 text-lg font-semibold">{cattle.batch}</h5>

        {/* Exibir o vídeo do YouTube */}
        {videoEmbedUrl ? (
          <div className="relative w-full h-full">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={videoEmbedUrl}
              title="YouTube Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p>Loading video...</p>
        )}
      </div>
    </Dialog>


    </>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between text-sm">
    <span className="font-bold">{label}:</span>
    <span className="text-400">{value}</span>
  </div>
);

export default CattleCards;
