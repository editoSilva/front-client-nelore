import { AdaptiveCard, Container } from "@/components/shared"


const Contrato = () => {


    return(
        
        <AdaptiveCard>
            <Container>
            <div className=" p-6 min-h-screen flex items-center justify-center">
                <div className="max-w-4xl p-8 shadow-lg rounded-lg">
                    <h1 className="text-2xl font-bold text-center mb-14">
                    CONTRATO DE INVESTIMENTO EM AQUISIÇÕES DE COTAS DE GADO
                    </h1>
                    <p className="text-justify mb-4">
                    O presente contrato regula as cotas e modalidades de investimento entre as partes abaixo:
                    </p>

                    <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">1. CONTRATANTE, INVESTIDOR</h2>
                    <p><strong>[Nome do Investidor]</strong>, inscrito no CPF/CNPJ sob nº <strong>[CPF/CNPJ]</strong>, residente/domiciliado em <strong>[endereço]</strong>, doravante denominado <strong>“INVESTIDOR”</strong>.</p>
                    <p><strong>2. CONTRATADO</strong> Nelore Invest Ltda., inscrita no CNPJ sob nº 63.214.753/0001-10, empresa de capital privado, com sede administrativa na Rua Goiás, 134, Centro, Camaçari-BA, neste ato representada por seu gerente administrativo.</p>
                    </section>

                    <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">1. OBJETO</h2>
                    <p>O presente contrato tem como objeto a participação do INVESTIDOR no investimento em cotas de gado da EMPRESA, através da aquisição de participação em rebanho da raça Nelore, destinado à produção e comercialização de gado de corte.</p>
                    <p>Aquisição de (10) cotas do grupo (1010-BA), com valor de arroba na data de hoje de R$ 326,90, totalizando o valor de R$ 3.269,00.</p>
                    </section>

                    <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">2. DO VALOR E PRAZO DE INVESTIMENTO</h2>
                    <p>Prazo de 12 meses, renováveis por outro período igual. Caso o investidor deseje rescisão, terá o prazo de 30 dias para solicitar por escrito.</p>
                    <p>A resolução do contrato se realizará pelo decurso do prazo ou pela recuperação do capital em dobro, capitalização de 100%.</p>
                    </section>

                    <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">3. DO RISCO E RESPONSABILIDADE DO INVESTIDOR</h2>
                    <p>O INVESTIDOR reconhece os riscos financeiros e operacionais envolvidos, incluindo variação de preços de mercado, risco sanitário e condições climáticas adversas.</p>
                    <p>A EMPRESA não se responsabiliza por qualquer perda ou diminuição do valor do investimento, exceto nos casos de dolo ou fraude comprovada.</p>
                    </section>

                    <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">4. DA RENTABILIDADE E RETORNO DO INVESTIMENTO</h2>
                    <p>O retorno sobre o investimento será proporcional à participação do INVESTIDOR nas cotas do rebanho, ocorrendo conforme a performance do gado e comercialização.</p>
                    <p>A EMPRESA fornecerá relatórios periódicos trimestrais sobre o andamento do rebanho.</p>
                    </section>

                    <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">5. DAS OBRIGAÇÕES DA EMPRESA</h2>
                    <p>A EMPRESA compromete-se a gerenciar o rebanho diligentemente, respeitando normas sanitárias e ambientais, e fornecendo relatórios periódicos sobre o investimento.</p>
                    </section>

                    <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">6. DAS OBRIGAÇÕES DO INVESTIDOR</h2>
                    <p>O INVESTIDOR compromete-se a efetuar o pagamento acordado e reconhece os riscos inerentes à atividade, incluindo a possibilidade de perdas financeiras.</p>
                    <p>O INVESTIDOR compromete-se a não interferir na gestão operacional do rebanho.</p>
                    </section>

                    <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">7. DA RESCISÃO DO CONTRATO</h2>
                    <p>Este contrato poderá ser rescindido por acordo mútuo, descumprimento de obrigações ou fatores de força maior. A rescisão não implica devolução do investimento salvo decisão judicial.</p>
                    </section>

                    <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">8. DA PROTEÇÃO DA EMPRESA</h2>
                    <p>A EMPRESA não se responsabiliza por fatores externos que alterem o valor do investimento, e o INVESTIDOR reconhece que os lucros são variáveis.</p>
                    </section>

                    <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">9. DESPESAS DE MANUTENÇÃO</h2>
                    <p>O INVESTIDOR declara estar ciente da cobrança mensal de 2% sobre sua cota para cobrir despesas de alimentação e vacinas obrigatórias conforme exigências do MAPA.</p>
                    </section>

                    <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">10. DISPOSIÇÕES GERAIS</h2>
                    <p>O INVESTIDOR declara ter ciência dos riscos do investimento. Alterações no contrato devem ser formalizadas por escrito.</p>
                    </section>

                    <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">11. FORO E LEGISLAÇÃO APLICÁVEL</h2>
                    <p>Fica eleito o foro da comarca de Camaçari-BA para resolver qualquer controvérsia oriunda deste contrato.</p>
                    </section>

                    <div className="text-center mt-6">
                    <p className="font-semibold">Camaçari, 23 de fevereiro de 2024</p>
                    <p className="mt-4">______________________<br /><strong>Nelore Invest Ltda.</strong><br />Representante Legal: Thaislane Gomes Rocha<br />Cargo: Gerente Administrativo (assinatura digital)</p>
                    <p className="mt-4">______________________<br /><strong>[Nome do Investidor]</strong><br />Investidor</p>
                    </div>
                </div>
                </div>
            </Container>
        </AdaptiveCard>
        
    )
   
}


export default Contrato;