import { useNavigate } from "react-router-dom";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Investment } from "@/@types/costumer/catte/CattleType";

interface CattleCardProps {
  cattle: Investment;
}

const CattleCards = ({ cattle }: CattleCardProps) => {
  const navigate = useNavigate();

  const handleInvestir = () => navigate(`/castle/${cattle.id}`);

  return (
    <div className="w-full sm:max-w-xs m-2">
      <Card
        clickable
        className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600"
        header={{
          content: (
            <div className="rounded-t-lg overflow-hidden">
              <img
                src={cattle.images?.[0]?.image || "https://via.placeholder.com/300"}
                alt={cattle.name}
                className="w-full h-40 sm:h-48 object-cover"
                loading="lazy"
              />
            </div>
          ),
          bordered: false,
          className: "p-0",
        }}
        footer={{
          content: (
            <div className="flex items-center">
              <Button variant="solid" block onClick={handleInvestir}>
                INVESTIR
              </Button>
            </div>
          ),
          bordered: false,
        }}
      >
        <div className="mt-3 space-y-2 text-sm">
          <InfoRow label="Disponíveis" value={cattle.total_shares} />
          <InfoRow label="Vendidos" value={cattle.shares_sold} />
          <InfoRow label="Raça" value={cattle.breed} />
          <InfoRow label="Nome" value={cattle.name} />
          <InfoRow
            label="Preço @"
            value={new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(parseFloat(cattle.price_per_share))}
          />
          <InfoRow label="Local" value={cattle.farm} />
        </div>
      </Card>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between text-sm">
    <span className="font-semibold">{label}:</span>
    <span className="text-gray-700">{value}</span>
  </div>
);

export default CattleCards;
