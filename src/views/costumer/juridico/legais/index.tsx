import { AdaptiveCard, Container } from "@/components/shared"


const Legais = () => {


    return(
        
        <AdaptiveCard>
            <Container>
            <div className="flex flex-col gap-4">
                {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">

                </div>
     */}
                    <h2 className="text-xl font-semibold">Informação Jurídica sobre a Natureza do Investimento</h2>

                    <p>
                    A participação na <strong>Invest Nellore</strong> não configura uma relação de consumo, mas sim um investimento em cotas pecuárias, formalizado por contrato. O investidor não adquire a posse direta dos animais, mas sim uma participação nos resultados da atividade pecuária. O modelo segue as normas jurídicas aplicáveis, garantindo transparência e segurança na gestão do capital investido.
                    </p>

                    <h3>Missão:</h3>
                    <p>
                    Facilitar o acesso ao investimento no agronegócio, proporcionando segurança, rentabilidade e inovação por meio da participação em cotas de investimento em gado. Comprometemo-nos com a transparência, o bem-estar animal e o desenvolvimento sustentável do setor pecuário.
                    </p>

                    <h3>Políticas da Empresa:</h3>
                    <ul>
                    <li><strong>Transparência e Ética</strong> – Garantimos comunicação clara e prestação de contas periódica aos investidores, assegurando total conformidade com normas e regulamentações.</li>
                    <li><strong>Sustentabilidade e Bem-Estar Animal</strong> – Adotamos práticas responsáveis na criação e manejo do gado, priorizando a sustentabilidade e o respeito aos animais.</li>
                    <li><strong>Rentabilidade e Segurança</strong> – Buscamos maximizar os retornos para nossos investidores com estratégias sólidas e gestão eficiente dos recursos.</li>
                    <li><strong>Inovação e Crescimento</strong> – Investimos em tecnologias e métodos modernos para aprimorar a produtividade e eficiência no setor pecuário.</li>
                    <li><strong>Relacionamento com Parceiros</strong> – Valorizamos parcerias de longo prazo com pecuaristas e demais stakeholders, promovendo um ecossistema de negócios saudável.</li>
                    </ul>

            </div>
            </Container>
        </AdaptiveCard>
        
    )
   
}


export default Legais;