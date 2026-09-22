/* ==========================================================================
   GEONEXUS: GLOBAL CRISIS — Dados do jogo
   Países, eventos, condições de desbloqueio e configurações gerais.
   ========================================================================== */

const CONFIG = {
  maxTurns: 16, // ~8 anos, em turnos semestrais
  startYear: 2026,
  statKeys: ["economia", "energia", "diplomacia", "seguranca", "tecnologia"],
  lowThreshold: 35,
  criticalThreshold: 20,
  healthyThreshold: 65,
  stabilityCriticalTrigger: 25,
};

/* ---------- Metadados dos indicadores ---------- */
const STAT_META = {
  economia: { label: "Economia" },
  energia: { label: "Energia" },
  diplomacia: { label: "Diplomacia" },
  seguranca: { label: "Segurança" },
  tecnologia: { label: "Tecnologia" },
  estabilidade: { label: "Estabilidade" },
};

/* ---------- Países jogáveis ---------- */
const COUNTRIES = [
  {
    id: "brasil",
    name: "Brasil",
    flag: "🇧🇷",
    coords: { left: 31, top: 63 },
    profile: "Potência regional com forte matriz energética renovável e economia em ascensão.",
    stats: { economia: 65, energia: 75, diplomacia: 70, seguranca: 60, tecnologia: 60, estabilidade: 68 },
  },
  {
    id: "eua",
    name: "Estados Unidos",
    flag: "🇺🇸",
    coords: { left: 18, top: 35 },
    profile: "Superpotência global com domínio militar, tecnológico e financeiro.",
    stats: { economia: 90, energia: 80, diplomacia: 82, seguranca: 95, tecnologia: 95, estabilidade: 80 },
  },
  {
    id: "china",
    name: "China",
    flag: "🇨🇳",
    coords: { left: 75, top: 40 },
    profile: "Gigante industrial e tecnológico em expansão de influência global.",
    stats: { economia: 85, energia: 75, diplomacia: 72, seguranca: 90, tecnologia: 90, estabilidade: 74 },
  },
  {
    id: "russia",
    name: "Rússia",
    flag: "🇷🇺",
    coords: { left: 66, top: 21 },
    profile: "Potência energética com forte aparato militar e relações internacionais tensas.",
    stats: { economia: 55, energia: 92, diplomacia: 48, seguranca: 82, tecnologia: 62, estabilidade: 55 },
  },
  {
    id: "india",
    name: "Índia",
    flag: "🇮🇳",
    coords: { left: 68, top: 49 },
    profile: "Economia populosa e em rápido crescimento, equilibrando tradição e inovação.",
    stats: { economia: 68, energia: 62, diplomacia: 66, seguranca: 70, tecnologia: 64, estabilidade: 64 },
  },
  {
    id: "japao",
    name: "Japão",
    flag: "🇯🇵",
    coords: { left: 85, top: 37 },
    profile: "Potência tecnológica com dependência energética externa e diplomacia refinada.",
    stats: { economia: 80, energia: 52, diplomacia: 80, seguranca: 74, tecnologia: 93, estabilidade: 78 },
  },
  {
    id: "alemanha",
    name: "Alemanha",
    flag: "🇩🇪",
    coords: { left: 51, top: 28 },
    profile: "Locomotiva industrial europeia, referência em diplomacia multilateral.",
    stats: { economia: 84, energia: 58, diplomacia: 86, seguranca: 68, tecnologia: 87, estabilidade: 80 },
  },
];

/* ---------- Eventos principais (disparam uma única vez, em ordem aleatória) ---------- */
const EVENTS = [
  {
    id: "crise_energetica",
    isCrisis: true,
    title: "Crise Energética",
    description: "Um importante fornecedor internacional reduziu drasticamente suas exportações de petróleo.",
    context: "Os mercados reagem com volatilidade e o governo precisa decidir como sustentar o abastecimento nacional.",
    options: [
      {
        label: "Investir em energia nuclear",
        effects: { energia: 15, economia: -5, tecnologia: 8 },
        result: "O programa nuclear avança, elevando a autonomia energética a longo prazo, mas exige pesados investimentos imediatos.",
        setFlags: { investiuNuclear: true },
      },
      {
        label: "Comprar de novos fornecedores",
        effects: { diplomacia: -3, economia: -8, energia: 10 },
        result: "Novos contratos garantem o abastecimento, mas a mudança de parceiros gera desconfiança entre aliados tradicionais.",
      },
      {
        label: "Utilizar reservas nacionais",
        effects: { energia: 5, economia: -2, estabilidade: 3 },
        result: "As reservas estratégicas amortecem o choque e transmitem segurança à população no curto prazo.",
      },
    ],
  },
  {
    id: "acordo_comercial",
    title: "Novo Acordo Comercial",
    description: "Um importante parceiro comercial propôs um amplo acordo de livre-comércio.",
    context: "O acordo promete abrir mercados, mas exige concessões regulatórias sensíveis.",
    options: [
      {
        label: "Aceitar integralmente",
        effects: { economia: 10, diplomacia: 8, estabilidade: -2 },
        result: "A economia se beneficia rapidamente do novo fluxo comercial, mas setores internos reclamam da perda de autonomia regulatória.",
      },
      {
        label: "Negociar termos parciais",
        effects: { economia: 4, diplomacia: 3, tecnologia: 2 },
        result: "O processo é mais lento, mas o equilíbrio entre ganhos e proteções internas mantém a estabilidade.",
      },
      {
        label: "Recusar a proposta",
        effects: { diplomacia: -6, estabilidade: 2, economia: -1 },
        result: "Setores estratégicos ficam protegidos, mas o país perde espaço nas negociações internacionais futuras.",
      },
    ],
  },
  {
    id: "crise_politica_regional",
    isCrisis: true,
    title: "Crise Política Regional",
    description: "Uma crise política ameaça a estabilidade de uma região vizinha estratégica.",
    context: "Órgãos multilaterais pressionam por uma posição clara do seu governo.",
    options: [
      {
        label: "Mediar o conflito",
        effects: { diplomacia: 10, estabilidade: 3, economia: -3 },
        result: "A mediação eleva o prestígio internacional do país, ainda que o esforço diplomático tenha custos.",
      },
      {
        label: "Apoiar um dos lados",
        effects: { seguranca: 5, diplomacia: -4, estabilidade: -2 },
        result: "O apoio fortalece um aliado estratégico, mas polariza a percepção internacional sobre o seu governo.",
      },
      {
        label: "Não intervir",
        effects: { estabilidade: 1, diplomacia: -2, seguranca: -3 },
        result: "A neutralidade evita desgaste imediato, mas passa a impressão de ausência em um momento decisivo.",
      },
    ],
  },
  {
    id: "nova_tecnologia_energetica",
    title: "Nova Tecnologia Energética",
    description: "Uma nova tecnologia de geração de energia tornou-se economicamente viável em escala industrial.",
    context: "Especialistas indicam uma janela curta para adoção competitiva.",
    options: [
      {
        label: "Adotar rapidamente",
        effects: { tecnologia: 12, energia: 10, economia: -6 },
        result: "A adoção acelerada coloca o país na vanguarda energética, ao custo de investimentos elevados.",
      },
      {
        label: "Adotar de forma gradual",
        effects: { tecnologia: 6, energia: 5, economia: -1 },
        result: "A transição gradual reduz riscos financeiros e mantém a modernização em ritmo sustentável.",
      },
      {
        label: "Manter a matriz atual",
        effects: { economia: 2, tecnologia: -2, energia: -3 },
        result: "A economia se mantém estável no curto prazo, mas o país perde competitividade tecnológica.",
      },
    ],
  },
  {
    id: "conflito_regional",
    isCrisis: true,
    title: "Conflito Regional",
    description: "Um conflito armado em uma região estratégica elevou a tensão internacional.",
    context: "Aliados e rivais observam atentamente a resposta do seu governo.",
    options: [
      {
        label: "Reforçar a segurança nacional",
        effects: { seguranca: 10, economia: -5, estabilidade: 2 },
        result: "O reforço militar tranquiliza a população, mas pressiona o orçamento público.",
      },
      {
        label: "Priorizar diplomacia ativa",
        effects: { diplomacia: 8, seguranca: -2, estabilidade: 1 },
        result: "A postura diplomática abre canais de negociação, embora reduza o foco em defesa imediata.",
      },
      {
        label: "Isolamento estratégico",
        effects: { seguranca: 3, diplomacia: -6, economia: 2 },
        result: "O país evita se envolver diretamente, mas perde influência nas decisões que moldarão a região.",
      },
    ],
  },
  {
    id: "rota_comercial_interrompida",
    isCrisis: true,
    title: "Rota Comercial Interrompida",
    description: "Uma rota comercial marítima estratégica foi interrompida por instabilidade regional.",
    context: "Cadeias de suprimento inteiras dependem dessa rota para operar normalmente.",
    options: [
      {
        label: "Buscar rota alternativa",
        effects: { economia: -4, energia: -2, tecnologia: 3 },
        result: "O investimento em logística alternativa reduz a dependência da rota original a médio prazo.",
      },
      {
        label: "Negociar a reabertura",
        effects: { diplomacia: 5, economia: -2, estabilidade: 1 },
        result: "As negociações multilaterais restabelecem parcialmente o fluxo comercial.",
      },
      {
        label: "Garantir acesso pela força",
        effects: { seguranca: 6, diplomacia: -8, economia: 3 },
        result: "O acesso é restabelecido rapidamente, mas a medida é vista com forte desconfiança internacional.",
      },
    ],
  },
  {
    id: "precos_energia_dispararam",
    isCrisis: true,
    title: "Disparada nos Preços de Energia",
    description: "Os preços internacionais de energia dispararam após uma sequência de choques de oferta.",
    context: "A população e a indústria sentem o impacto imediato no custo de vida e na produção.",
    options: [
      {
        label: "Subsidiar a população",
        effects: { economia: -10, estabilidade: 6, energia: 2 },
        result: "Os subsídios aliviam a pressão social, mas comprometem as contas públicas.",
      },
      {
        label: "Repassar os preços ao mercado",
        effects: { economia: 3, estabilidade: -6, energia: 1 },
        result: "As finanças públicas ficam protegidas, mas o descontentamento popular cresce rapidamente.",
      },
      {
        label: "Acelerar a transição renovável",
        effects: { tecnologia: 8, energia: 6, economia: -5 },
        result: "O choque de preços acelera investimentos estruturais em energia renovável.",
      },
    ],
  },
  {
    id: "ataque_cibernetico",
    isCrisis: true,
    title: "Ataque Cibernético",
    description: "Um ataque cibernético expôs vulnerabilidades graves em infraestruturas críticas.",
    context: "Serviços essenciais ficaram parcialmente comprometidos por algumas horas.",
    options: [
      {
        label: "Investir em cibersegurança",
        effects: { seguranca: 10, tecnologia: 5, economia: -4 },
        result: "A resposta técnica fortalece as defesas digitais do país a longo prazo.",
      },
      {
        label: "Buscar cooperação internacional",
        effects: { diplomacia: 7, seguranca: 5, economia: -2 },
        result: "A cooperação com outros países acelera a investigação e fortalece parcerias estratégicas.",
      },
      {
        label: "Resposta ofensiva direta",
        effects: { seguranca: 4, diplomacia: -9, estabilidade: -2 },
        result: "A retaliação sinaliza força, mas eleva a tensão diplomática com possíveis responsáveis.",
      },
    ],
  },
  {
    id: "onda_migratoria",
    title: "Onda Migratória Regional",
    description: "Uma onda migratória regional pressiona fronteiras e serviços públicos.",
    context: "Organizações internacionais monitoram a resposta humanitária do seu governo.",
    options: [
      {
        label: "Acolher e integrar",
        effects: { diplomacia: 8, estabilidade: -3, economia: 2 },
        result: "A acolhida melhora a imagem internacional do país, mas exige investimentos sociais imediatos.",
      },
      {
        label: "Controle rigoroso de fronteiras",
        effects: { seguranca: 6, diplomacia: -5, estabilidade: 2 },
        result: "O controle reduz a pressão sobre serviços públicos, mas gera críticas de organismos internacionais.",
      },
      {
        label: "Apoio humanitário limitado",
        effects: { diplomacia: 3, estabilidade: 1, economia: -2 },
        result: "A resposta equilibrada evita desgastes maiores, sem resolver o problema por completo.",
      },
    ],
  },
  {
    id: "disputa_comercial_tarifas",
    title: "Disputa Comercial Internacional",
    description: "Uma disputa comercial entre grandes potências resultou em tarifas retaliatórias globais.",
    context: "Seu governo precisa decidir como se posicionar diante do racha comercial.",
    options: [
      {
        label: "Alinhar-se ao bloco ocidental",
        effects: { diplomacia: 6, economia: -3, seguranca: 2 },
        result: "O alinhamento fortalece laços tradicionais, mas reduz o acesso a mercados alternativos.",
      },
      {
        label: "Aproximar-se de novos mercados",
        effects: { economia: 5, diplomacia: -4 },
        result: "Novos parceiros comerciais compensam perdas, mas a diversificação gera desconfiança entre aliados antigos.",
      },
      {
        label: "Manter neutralidade comercial",
        effects: { diplomacia: 2, economia: -1, estabilidade: 2 },
        result: "A neutralidade preserva relações com ambos os lados, sem grandes ganhos imediatos.",
      },
    ],
  },
  {
    id: "escassez_hidrica",
    isCrisis: true,
    title: "Escassez Hídrica",
    description: "Uma seca prolongada reduziu a geração de energia hidrelétrica e afetou a agricultura.",
    context: "Reservatórios atingem níveis críticos em várias regiões do país.",
    options: [
      {
        label: "Investir em infraestrutura hídrica",
        effects: { tecnologia: 7, energia: 4, economia: -6 },
        result: "Os novos investimentos reduzem a vulnerabilidade a futuras crises hídricas.",
      },
      {
        label: "Racionamento controlado",
        effects: { estabilidade: -3, energia: 3, economia: 1 },
        result: "O racionamento evita colapso no abastecimento, mas gera desconforto imediato na população.",
      },
      {
        label: "Importar energia e alimentos",
        effects: { economia: -5, diplomacia: 3, energia: 5 },
        result: "As importações emergenciais aliviam a crise, aprofundando parcerias comerciais externas.",
      },
    ],
  },
  {
    id: "manifestacoes_populares",
    isCrisis: true,
    title: "Manifestações Populares",
    description: "Manifestações populares tomaram as ruas exigindo reformas econômicas.",
    context: "A pressão popular cresce e divide a opinião pública sobre o rumo do governo.",
    options: [
      {
        label: "Implementar reformas",
        effects: { economia: 3, estabilidade: 6, diplomacia: 2 },
        result: "As reformas atendem parte das demandas e reduzem a tensão social gradualmente.",
      },
      {
        label: "Reprimir as manifestações",
        effects: { seguranca: 4, estabilidade: -8, diplomacia: -5 },
        result: "A repressão contém os protestos no curto prazo, mas aprofunda a desconfiança institucional.",
      },
      {
        label: "Abrir diálogo direto",
        effects: { estabilidade: 4, economia: -1, diplomacia: 1 },
        result: "O diálogo reduz a tensão imediata e fortalece a legitimidade do governo.",
      },
    ],
  },
  {
    id: "corrida_tecnologica",
    title: "Coalizão Tecnológica Internacional",
    description: "Uma coalizão internacional propôs um programa conjunto de tecnologia de ponta e exploração espacial.",
    context: "Participar do programa exige recursos significativos, mas promete retornos estratégicos.",
    options: [
      {
        label: "Liderar o programa",
        effects: { tecnologia: 10, economia: -6, diplomacia: 4 },
        result: "A liderança no programa projeta o país como referência tecnológica global.",
      },
      {
        label: "Participar como parceiro",
        effects: { tecnologia: 5, diplomacia: 5, economia: -2 },
        result: "A participação equilibrada garante ganhos tecnológicos com custos controlados.",
      },
      {
        label: "Não participar",
        effects: { economia: 1, tecnologia: -3, diplomacia: -2 },
        result: "O país preserva recursos no curto prazo, mas fica para trás na corrida tecnológica global.",
      },
    ],
  },
  {
    id: "crise_bancaria_internacional",
    isCrisis: true,
    title: "Crise Bancária Internacional",
    description: "A quebra de instituições financeiras internacionais ameaça contagiar os mercados globais.",
    context: "Investidores monitoram a resposta dos principais governos para avaliar o risco de contágio.",
    options: [
      {
        label: "Lançar pacote de estabilização",
        effects: { economia: 4, estabilidade: 5, diplomacia: -2 },
        result: "O pacote contém o pânico financeiro, ainda que gere críticas sobre o uso de recursos públicos.",
      },
      {
        label: "Deixar o mercado se ajustar",
        effects: { economia: -8, estabilidade: -4 },
        result: "A ausência de intervenção agrava a crise de confiança no curto prazo.",
      },
      {
        label: "Buscar cooperação multilateral",
        effects: { economia: 2, diplomacia: 7, estabilidade: 2 },
        result: "A resposta coordenada com outros países reduz o risco sistêmico com custos compartilhados.",
      },
    ],
  },
];

/* ---------- Eventos condicionais (desbloqueados por estado do país) ---------- */
const CONDITIONAL_EVENTS = [
  {
    id: "potencia_nuclear",
    title: "Potência Nuclear Emergente",
    description: "Seu país tornou-se um importante produtor de energia nuclear, atraindo atenção internacional.",
    context: "O avanço tecnológico abre novas possibilidades de posicionamento estratégico.",
    condition: (state) =>
      state.flags.investiuNuclear && state.stats.tecnologia >= 70 && state.stats.energia >= 75,
    options: [
      {
        label: "Exportar tecnologia nuclear",
        effects: { economia: 10, diplomacia: 5, tecnologia: 3 },
        result: "A exportação tecnológica abre novos mercados e fortalece parcerias estratégicas.",
      },
      {
        label: "Manter uso exclusivamente doméstico",
        effects: { energia: 5, estabilidade: 3 },
        result: "O uso doméstico consolida a segurança energética nacional sem exposição externa.",
      },
      {
        label: "Liderar regulação internacional do setor",
        effects: { diplomacia: 10, tecnologia: 2 },
        result: "A liderança regulatória projeta o país como referência global em energia nuclear responsável.",
      },
    ],
  },
  {
    id: "fuga_investimentos",
    isCrisis: true,
    title: "Fuga de Investimentos",
    description: "Empresas internacionais reduziram seus investimentos no país, preocupadas com a instabilidade econômica.",
    context: "Agências de risco revisam suas projeções para os próximos anos.",
    condition: (state) => state.stats.economia < CONFIG.lowThreshold,
    options: [
      {
        label: "Pacote de incentivos fiscais",
        effects: { economia: 8, estabilidade: 2, diplomacia: -1 },
        result: "Os incentivos atraem parte dos investidores de volta, ao custo de receita fiscal futura.",
      },
      {
        label: "Nacionalizar setores estratégicos",
        effects: { economia: 4, diplomacia: -6, estabilidade: -3 },
        result: "A medida garante controle imediato, mas afasta ainda mais investidores estrangeiros.",
      },
      {
        label: "Buscar apoio de organismos internacionais",
        effects: { economia: 6, diplomacia: 2, estabilidade: 1 },
        result: "O apoio externo estabiliza a economia, com contrapartidas de ajuste fiscal.",
      },
    ],
  },
  {
    id: "revisao_aliancas",
    isCrisis: true,
    title: "Aliados em Dúvida",
    description: "Países aliados começam a rever seus acordos, preocupados com a postura internacional do seu governo.",
    context: "Chancelarias parceiras sinalizam desconforto em canais diplomáticos.",
    condition: (state) => state.stats.diplomacia < CONFIG.lowThreshold,
    options: [
      {
        label: "Lançar ofensiva diplomática",
        effects: { diplomacia: 10, economia: -3 },
        result: "A ofensiva diplomática reconstrói parte da confiança perdida junto a aliados históricos.",
      },
      {
        label: "Reafirmar soberania nacional",
        effects: { seguranca: 4, diplomacia: -3, estabilidade: 2 },
        result: "A postura firme agrada à opinião interna, mas aprofunda o isolamento externo.",
      },
      {
        label: "Conceder garantias comerciais",
        effects: { diplomacia: 7, economia: -5 },
        result: "As concessões comerciais recuperam parte da confiança dos parceiros internacionais.",
      },
    ],
  },
  {
    id: "tensoes_internas",
    isCrisis: true,
    title: "Tensões Internas",
    description: "A queda na segurança nacional elevou as tensões internas em diversas regiões do país.",
    context: "Relatos de instabilidade local chegam às principais redações internacionais.",
    condition: (state) => state.stats.seguranca < CONFIG.lowThreshold,
    options: [
      {
        label: "Reforço policial e militar",
        effects: { seguranca: 9, estabilidade: 2, diplomacia: -2 },
        result: "O reforço reduz a instabilidade imediata, mas levanta questionamentos sobre direitos civis.",
      },
      {
        label: "Investir em segurança social",
        effects: { estabilidade: 5, economia: -4, seguranca: 2 },
        result: "O investimento social ataca causas estruturais da instabilidade, com efeito gradual.",
      },
      {
        label: "Decretar estado de emergência",
        effects: { seguranca: 6, estabilidade: -4, diplomacia: -3 },
        result: "A medida excepcional contém a crise no curto prazo, mas gera forte repercussão negativa.",
      },
    ],
  },
  {
    id: "crise_abastecimento_energetico",
    isCrisis: true,
    title: "Crise de Abastecimento Energético",
    description: "Apagões generalizados afetam a indústria e a população em razão da baixa oferta de energia.",
    context: "Setores produtivos pressionam por uma resposta rápida do governo.",
    condition: (state) => state.stats.energia < CONFIG.lowThreshold,
    options: [
      {
        label: "Importação emergencial de energia",
        effects: { energia: 12, economia: -6 },
        result: "A importação emergencial normaliza o abastecimento a um custo financeiro elevado.",
      },
      {
        label: "Racionamento nacional",
        effects: { energia: 6, estabilidade: -5 },
        result: "O racionamento reduz o impacto industrial, mas gera forte insatisfação popular.",
      },
      {
        label: "Mobilizar reservas estratégicas",
        effects: { energia: 8, estabilidade: -1 },
        result: "As reservas estratégicas amenizam a crise enquanto soluções estruturais são planejadas.",
      },
    ],
  },
  {
    id: "crise_estabilidade",
    isCrisis: true,
    critical: true,
    title: "Crise de Estabilidade",
    description: "O equilíbrio interno do país atingiu um nível crítico. Decisões urgentes são necessárias para evitar o colapso.",
    context: "Instituições, mercados e a população aguardam uma resposta imediata do governo.",
    condition: (state) =>
      state.stats.estabilidade <= CONFIG.stabilityCriticalTrigger && state.stats.estabilidade > 0,
    cooldown: 3,
    options: [
      {
        label: "Plano emergencial de reformas",
        effects: { estabilidade: 15, economia: -5, diplomacia: 2 },
        result: "O plano de reformas recupera parte da confiança institucional, com custos econômicos imediatos.",
      },
      {
        label: "Formar governo de unidade nacional",
        effects: { estabilidade: 12, seguranca: 3, economia: -2 },
        result: "A união em torno de um pacto nacional estabiliza temporariamente o país.",
      },
      {
        label: "Adotar medidas de exceção",
        effects: { estabilidade: 10, diplomacia: -6, seguranca: 4 },
        result: "As medidas de exceção contêm o colapso imediato, mas custam caro à imagem internacional do governo.",
      },
    ],
  },
];

/* ---------- Eventos de preenchimento (podem se repetir quando os demais se esgotam) ---------- */
const FILLER_EVENTS = [
  {
    id: "cupula_internacional",
    repeatable: true,
    title: "Cúpula Internacional",
    description: "Uma cúpula internacional discute cooperação econômica, tecnológica e ambiental.",
    context: "Delegações de dezenas de países debatem os próximos passos da agenda global.",
    options: [
      {
        label: "Propor novas iniciativas",
        effects: { diplomacia: 4, tecnologia: 2 },
        result: "As propostas são bem recebidas e reforçam o protagonismo do país no debate global.",
      },
      {
        label: "Observar à distância",
        effects: { estabilidade: 1 },
        result: "A postura discreta evita desgastes, mas reduz a visibilidade internacional do país.",
      },
      {
        label: "Criticar publicamente o formato",
        effects: { diplomacia: -3, seguranca: 1 },
        result: "As críticas geram debate, mas irritam parte dos parceiros presentes na cúpula.",
      },
    ],
  },
  {
    id: "flutuacao_mercado",
    repeatable: true,
    title: "Flutuação nos Mercados Globais",
    description: "Flutuações nos mercados globais afetam a confiança dos investidores internacionais.",
    context: "Analistas divergem sobre a real extensão do impacto econômico.",
    options: [
      {
        label: "Anunciar estímulo econômico",
        effects: { economia: 4, estabilidade: -1 },
        result: "O estímulo aquece a atividade econômica, com efeitos fiscais que exigirão atenção futura.",
      },
      {
        label: "Adotar política fiscal conservadora",
        effects: { economia: 1, estabilidade: 2 },
        result: "A prudência fiscal transmite segurança aos mercados, com crescimento mais modesto.",
      },
      {
        label: "Aguardar estabilização natural",
        effects: { estabilidade: 1 },
        result: "O mercado se ajusta lentamente por conta própria, sem intervenção direta do governo.",
      },
    ],
  },
  {
    id: "parceria_bilateral",
    repeatable: true,
    title: "Proposta de Parceria Bilateral",
    description: "Uma nação parceira propôs o fortalecimento de laços bilaterais estratégicos.",
    context: "A proposta inclui cooperação em comércio, tecnologia e segurança.",
    options: [
      {
        label: "Firmar parceria estratégica",
        effects: { diplomacia: 5, economia: 2 },
        result: "A parceria amplia a rede de influência do país em áreas-chave.",
      },
      {
        label: "Manter a relação nos termos atuais",
        effects: { estabilidade: 1 },
        result: "A relação segue estável, sem ganhos ou perdas significativas.",
      },
      {
        label: "Priorizar outros parceiros",
        effects: { diplomacia: -2, economia: 1 },
        result: "A escolha por outras prioridades gera um leve desgaste com o parceiro proponente.",
      },
    ],
  },
];

/* ---------- Metadados para o painel de mapa (relações internacionais) ---------- */
const NATION_META = {
  brasil: { trade: "Agropecuária, minérios e energia renovável", strategic: "Liderança na América do Sul" },
  eua: { trade: "Tecnologia, serviços financeiros e defesa", strategic: "Principal potência militar e econômica global" },
  china: { trade: "Manufatura, eletrônicos e infraestrutura", strategic: "Maior polo industrial do mundo" },
  russia: { trade: "Petróleo, gás natural e armamentos", strategic: "Principal fornecedor de energia da Eurásia" },
  india: { trade: "Serviços de TI, têxteis e farmacêutica", strategic: "Maior democracia do mundo em ascensão" },
  japao: { trade: "Eletrônicos, automóveis e robótica", strategic: "Referência tecnológica do Pacífico" },
  alemanha: { trade: "Manufatura industrial e engenharia", strategic: "Centro econômico e diplomático da Europa" },
};
