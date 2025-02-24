
import { Card, Button, Progress } from "@/components/ui";
import { HiBookOpen, HiShoppingCart } from "react-icons/hi";

const CardLeilao = () => {

    const auctions = [
        {
          title: "Leilão de Touros Nelore",
          date: "25/02/2025",
          location: "Esperança",
          startingBid: "R$ 5.000,00",
          status: "Aberto",
           image: "https://img.mfleiloes.com.br/api/image?url=https://s3.amazonaws.com/mfleiloes/capas/em-breve-1-leilao-agro-_20250128145130.jpeg&width=620&height=620&strategy=1"
        },
        {
          title: "Leilão de Gado de Corte",
          date: "10/03/2025",
          location: "Rancho Primavera",
          startingBid: "R$ 3.500,00",
          status: "Encerrado",
           image: "https://img.mfleiloes.com.br/api/image?url=https://s3.amazonaws.com/mfleiloes/capas/em-breve-1-leilao-agro-_20250128145130.jpeg&width=620&height=620&strategy=1"
        }
      ];

      

      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {auctions.map((auction, index) => (
        <Card
        key={index}
        className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600"
        clickable
        onClick={() => console.log("Leilão selecionado", auction.title)}
        header={{
          content: auction.status,
        }}
      >
        <img src={auction.image} alt={auction.title} className="w-full h-40 object-cover rounded-t-lg" />
        <h5 className="p-2 text-lg font-bold break-words mb-4 whitespace-pre-wrap">
          {auction.title}
        </h5>
        
        <div className="grid grid-cols-2 gap-2">
          <p className="p-2 break-words whitespace-pre-wrap">Data</p>
          <p className="p-2 break-words whitespace-pre-wrap"><b>{auction.date}</b></p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <p className="p-2 break-words whitespace-pre-wrap">Local</p>
          <p className="p-2 break-words whitespace-pre-wrap">{auction.location}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <p className="p-2 break-words whitespace-pre-wrap">Lance Inicial</p>
          <p className="p-2 break-words whitespace-pre-wrap">{auction.startingBid}</p>
        </div>
        
        <div className="mt-5">
          <Button
            variant="solid"
            block
            icon={<HiShoppingCart />}
            onClick={() => console.log("Participar do leilão", auction.title)}
          >
            Participar do Leilão
          </Button>
        </div>
      </Card>
      ))}
   </div>
        </>
      )


}




export default CardLeilao;