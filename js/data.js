/* ==========================================================================
   Geonexus — dados do site (conteúdo compartilhado entre todas as páginas)
   ========================================================================== */

const ANALISES = [
  {
    slug: "eua-china",
    categoria: "Relações Internacionais",
    titulo: "EUA x China: A Nova Guerra Fria?",
    resumo:
      "Entenda a disputa por poder, tecnologia e influência global entre as duas maiores economias do mundo.",
    data: "12 de maio de 2024",
    imagem: "assets/imagensAnalise/analise-eua-china.jpg",
  },
  {
    slug: "oriente-medio",
    categoria: "Conflitos e Segurança",
    titulo: "Oriente Médio: Tensões em Alta",
    resumo:
      "A escalada de conflitos e os impactos geopolíticos na região mais estratégica do planeta.",
    data: "10 de maio de 2024",
    imagem: "assets/imagensAnalise/analise-oriente-medio.jpg",
  },
  {
    slug: "uniao-europeia",
    categoria: "Economia Global",
    titulo: "União Europeia: Desafios Internos",
    resumo:
      "Crises econômicas, populismo e energia: os desafios que testam a união do bloco europeu.",
    data: "08 de maio de 2024",
    imagem: "assets/imagensAnalise/analise-uniao-europeia.jpg",
  },
  {
    slug: "america-latina",
    categoria: "América Latina",
    titulo: "América Latina: Entre Gigantes",
    resumo:
      "A posição estratégica da América Latina e os interesses das grandes potências na região.",
    data: "06 de maio de 2024",
    imagem: "assets/imagensAnalise/analise-america-latina.jpg",
  },
  {
    slug: "africa",
    categoria: "África",
    titulo: "África: O Continente do Futuro?",
    resumo:
      "Recursos naturais, crescimento populacional e o potencial de transformação econômica da África.",
    data: "03 de maio de 2024",
    imagem: "assets/imagensAnalise/analise-africa.jpg",
  },
  {
    slug: "ciberseguranca",
    categoria: "Tecnologia e Segurança",
    titulo: "Cibersegurança: A Nova Fronteira",
    resumo:
      "Ataques cibernéticos e guerras digitais: como a tecnologia redefine os conflitos modernos.",
    data: "01 de maio de 2024",
    imagem: "assets/imagensAnalise/analise-ciberseguranca.jpg",
  },
];

const REGIOES = [
  {
    slug: "europa",
    nome: "Europa",
    chamada: "União, diversidade e desafios políticos em um continente estratégico.",
    descricao:
      "A Europa é um continente localizado no hemisfério Norte, marcado por uma vasta história e influência cultural. É formada por diversos países, entre França, Alemanha e Itália. O continente possui elevado desenvolvimento econômico e tecnológico, além de patrimônio histórico, artístico e arquitetônico.",
    paises: "44",
    populacao: "~745 mi",
    pib: "US$ 23,7 tri",
    bloco: "União Europeia",
    destaques: [
      { titulo: "Integração", texto: "Bloco econômico e monetário mais profundo do mundo." },
      { titulo: "Defesa", texto: "Rearmamento e coordenação militar em expansão." },
      { titulo: "Energia", texto: "Transição acelerada após a dependência do gás russo." },
      { titulo: "Demografia", texto: "Envelhecimento populacional e pressão migratória." },
    ],
  },
  {
    slug: "asia",
    nome: "Ásia",
    chamada: "O maior continente do mundo e o novo centro de gravidade econômico.",
    descricao:
      "A Ásia é o maior e mais populoso continente do mundo. Localizada principalmente nos hemisférios Norte e Oriental, possui grande diversidade cultural, econômica e geográfica. Abriga países como China, Índia e Japão, com berço de antigas civilizações e religiões.",
    paises: "49",
    populacao: "~4,7 bi",
    pib: "US$ 39,6 tri",
    bloco: "ASEAN · APEC",
    destaques: [
      { titulo: "Manufatura", texto: "Centro global das cadeias industriais e de semicondutores." },
      { titulo: "Rivalidade", texto: "Disputa entre China e EUA no Indo-Pacífico." },
      { titulo: "Energia", texto: "Maior consumidor mundial de petróleo e carvão." },
      { titulo: "Demografia", texto: "Mais da metade da população do planeta." },
    ],
  },
  {
    slug: "america-latina",
    nome: "América Latina",
    chamada: "Recursos, desigualdade e a busca por autonomia política global.",
    descricao:
      "A América Latina compreende os países da América onde predominam línguas derivadas do latim, como português, espanhol e francês. A região inclui países como Brasil, Argentina e México. Destaca-se pela diversidade cultural, riqueza natural e forte herança indígena, africana e europeia.",
    paises: "33",
    populacao: "~660 mi",
    pib: "US$ 6,3 tri",
    bloco: "Mercosul · CELAC",
    destaques: [
      { titulo: "Recursos", texto: "Reservas críticas de lítio, cobre e água doce." },
      { titulo: "Agro", texto: "Fornecedor central de alimentos para o mundo." },
      { titulo: "Instabilidade", texto: "Ciclos políticos e volatilidade institucional." },
      { titulo: "Comércio", texto: "Aproximação simultânea com China e Estados Unidos." },
    ],
  },
  {
    slug: "oceania",
    nome: "Oceania",
    chamada: "Biodiversidade única, desafios das mudanças climáticas e transição energética.",
    descricao:
      "A Oceania é o menor continente do mundo, formado por milhares de ilhas localizadas principalmente no hemisfério Sul. Inclui a Austrália, Nova Zelândia e Fiji. A região é conhecida por sua biodiversidade única e forte relação com o Oceano Pacífico.",
    paises: "14",
    populacao: "~45 mi",
    pib: "US$ 1,9 tri",
    bloco: "Fórum das Ilhas do Pacífico",
    destaques: [
      { titulo: "Clima", texto: "Ilhas ameaçadas pela elevação do nível do mar." },
      { titulo: "Minerais", texto: "Austrália como grande exportadora de minério e gás." },
      { titulo: "Segurança", texto: "Disputa de influência entre China e aliados ocidentais." },
      { titulo: "Oceano", texto: "Controle de rotas e zonas econômicas exclusivas." },
    ],
  },
  {
    slug: "africa",
    nome: "África",
    chamada: "Riquezas naturais, conflitos e potencial de crescimento do continente.",
    descricao:
      "A África é o segundo maior continente em extensão territorial e população. Localizada principalmente entre os trópicos, é rica em recursos naturais e possui enorme diversidade cultural, étnica e ambiental. Abriga países como Egito, Nigéria e África do Sul.",
    paises: "54",
    populacao: "~1,5 bi",
    pib: "US$ 3,1 tri",
    bloco: "União Africana",
    destaques: [
      { titulo: "Demografia", texto: "Continente mais jovem e de crescimento mais rápido." },
      { titulo: "Minerais", texto: "Cobalto, ouro e terras raras estratégicos." },
      { titulo: "Infraestrutura", texto: "Corredores ferroviários disputados por potências." },
      { titulo: "Conflitos", texto: "Instabilidade no Sahel e no Corno de África." },
    ],
  },
  {
    slug: "america-do-norte",
    nome: "América do Norte",
    chamada: "Relações de poder, economia e segurança na região liderada pelos EUA.",
    descricao:
      "A América do Norte está localizada no hemisfério Norte e é formada principalmente por Canadá, Estados Unidos e México. Concentra uma das maiores economias e potências militares do planeta, com alto grau de integração comercial, tecnológica e energética.",
    paises: "3",
    populacao: "~500 mi",
    pib: "US$ 30,4 tri",
    bloco: "USMCA",
    destaques: [
      { titulo: "Poder militar", texto: "Maior orçamento de defesa do mundo." },
      { titulo: "Tecnologia", texto: "Centro global de inovação e capital de risco." },
      { titulo: "Energia", texto: "Maior produtor de petróleo e gás natural." },
      { titulo: "Migração", texto: "Fluxos e fronteiras no centro do debate político." },
    ],
  },
];

const TEMAS = [
  {
    slug: "energia-e-recursos",
    nome: "Energia e Recursos",
    descricao:
      "O controle e o acesso a recursos naturais, especialmente energia, são fatores determinantes nas relações internacionais.",
    detalhe:
      "Do petróleo ao lítio, os recursos movimentam economias, alianças e conflitos. Quem domina a extração, o refino e as rotas de transporte define boa parte do equilíbrio de poder global.",
    imagem: "assets/imagensTemas/tema-petroleo.png",
    artigos: [
      { titulo: "Energia Global", resumo: "Últimas nucleares viram ao centro do debate energético.", data: "14 de maio de 2024", imagem: "assets/imagensTemas/tema-usina-nuclear.png" },
      { titulo: "Transição Energética", resumo: "O futuro das energias renováveis e a corrida por minerais críticos.", data: "11 de maio de 2024", imagem: "assets/imagens2/transicao-energetica.png" },
      { titulo: "Minerais Estratégicos", resumo: "Lítio: o novo petróleo do século XXI.", data: "07 de maio de 2024", imagem: "assets/imagensTemas/tema-minerais.png" },
    ],
  },
  {
    slug: "meio-ambiente",
    nome: "Meio Ambiente",
    descricao:
      "A crise climática deixou de ser pauta ambiental e virou fator central de segurança e economia.",
    detalhe:
      "Secas, enchentes e perda de solo produtivo redesenham fluxos migratórios e provocam disputas por água entre países vizinhos.",
    imagem: "assets/imagens2/meio-ambiente.png",
    artigos: [
      { titulo: "Água como Ativo", resumo: "Bacias compartilhadas viram ponto de tensão diplomática.", data: "13 de maio de 2024" },
      { titulo: "Amazônia e Soberania", resumo: "Pressão internacional e o debate sobre governança da floresta.", data: "09 de maio de 2024" },
      { titulo: "Metas Climáticas", resumo: "O custo econômico dos compromissos de descarbonização.", data: "05 de maio de 2024" },
    ],
  },
  {
    slug: "migracoes-globais",
    nome: "Migrações Globais",
    descricao:
      "Deslocamentos humanos em massa transformam a política interna de países receptores.",
    detalhe:
      "Conflitos, colapso econômico e eventos climáticos empurram milhões de pessoas por ano, pressionando fronteiras e alimentando disputas eleitorais.",
    imagem: "assets/imagens2/migracoes-globais.png",
    artigos: [
      { titulo: "Rotas do Mediterrâneo", resumo: "Como a Europa reformulou sua política de fronteiras.", data: "12 de maio de 2024" },
      { titulo: "Deslocados Climáticos", resumo: "A categoria que ainda não existe no direito internacional.", data: "08 de maio de 2024" },
      { titulo: "Diásporas e Economia", resumo: "Remessas sustentam o PIB de dezenas de países.", data: "04 de maio de 2024" },
    ],
  },
  {
    slug: "tecnologia-e-inovacao",
    nome: "Tecnologia e Inovação",
    descricao:
      "Semicondutores, inteligência artificial e infraestrutura digital são o novo território de disputa.",
    detalhe:
      "O controle sobre chips avançados e cabos submarinos define quem consegue projetar poder econômico e militar na próxima década.",
    imagem: "assets/imagens2/tecnologia-e-inovacao.png",
    artigos: [
      { titulo: "Guerra dos Chips", resumo: "Restrições de exportação reescrevem a cadeia produtiva.", data: "14 de maio de 2024" },
      { titulo: "IA e Regulação", resumo: "Blocos disputam o padrão global de governança.", data: "10 de maio de 2024" },
      { titulo: "Cabos Submarinos", resumo: "A infraestrutura invisível que sustenta a internet.", data: "06 de maio de 2024" },
    ],
  },
  {
    slug: "terrorismo-e-seguranca",
    nome: "Terrorismo e Segurança",
    descricao:
      "Ameaças assimétricas exigem novas doutrinas de defesa e cooperação entre Estados.",
    detalhe:
      "Grupos não estatais, milícias e redes transnacionais operam em zonas de vácuo institucional e afetam rotas comerciais inteiras.",
    imagem: "assets/imagens2/terrorismo-e-seguranca.png",
    artigos: [
      { titulo: "Sahel em Crise", resumo: "O avanço de grupos armados e a retirada ocidental.", data: "13 de maio de 2024" },
      { titulo: "Pirataria Marítima", resumo: "O custo do risco no frete internacional.", data: "09 de maio de 2024" },
      { titulo: "Guerra Híbrida", resumo: "Desinformação como instrumento de Estado.", data: "02 de maio de 2024" },
    ],
  },
  {
    slug: "comercio-internacional",
    nome: "Comércio Internacional",
    descricao:
      "Tarifas, sanções e acordos regionais moldam o fluxo de bens entre continentes.",
    detalhe:
      "A fragmentação do comércio global em blocos rivais eleva custos e obriga empresas a redesenhar suas cadeias de suprimento.",
    imagem: "assets/imagens2/comercio-internacional.png",
    artigos: [
      { titulo: "Nearshoring", resumo: "Empresas aproximam a produção dos mercados consumidores.", data: "12 de maio de 2024" },
      { titulo: "Sanções Econômicas", resumo: "Eficácia e efeitos colaterais de um instrumento em alta.", data: "07 de maio de 2024" },
      { titulo: "Estreitos Críticos", resumo: "Malaca, Ormuz e Suez sob pressão simultânea.", data: "03 de maio de 2024" },
    ],
  },
];

const TEORIAS = [
  {
    titulo: "Teoria do Heartland",
    texto:
      "Formulada por Halford Mackinder, sustenta que quem controla a Eurásia central controla o mundo. Explica boa parte da atenção dada à Europa Oriental e à Ásia Central.",
  },
  {
    titulo: "Poder Marítimo",
    texto:
      "Alfred Mahan defendeu que o domínio dos mares garante projeção de poder. A lógica segue viva no controle de estreitos, portos e rotas de contêineres.",
  },
  {
    titulo: "Rimland",
    texto:
      "Nicholas Spykman argumentou que a faixa costeira em volta da Eurásia é o verdadeiro eixo de disputa — hoje visível no Indo-Pacífico e no Golfo Pérsico.",
  },
];

const LEITURAS = [
  { titulo: "A Nova Geopolítica", autor: "Antologia contemporânea", nota: "Panorama das disputas do século XXI.", icone: "assets/imagensLeituras/nova-geopolitica.png" },
  { titulo: "Geopolítica", autor: "Introdução clássica", nota: "Conceitos fundamentais em linguagem direta.", icone: "assets/imagensLeituras/geopolitica.png" },
  { titulo: "Novas Geopolíticas", autor: "Ensaios reunidos", nota: "Território, tecnologia e poder.", icone: "assets/imagensLeituras/novas-geopoliticas.png" },
  { titulo: "À Beira do Abismo", autor: "Análise de conflitos", nota: "Crises recentes e seus desdobramentos.", icone: "assets/imagensLeituras/beira-do-abismo.png" },
  { titulo: "Política, Ideologia e Conspirações", autor: "Estudo crítico", nota: "Narrativas e disputa de poder.", icone: "assets/imagensLeituras/politica-ideologia.png" },
];

const EQUIPE = [
  { nome: "Gustavo Martins", papel: "Criador da Home", foto: "assets/imagensEquipe/gustavo-martins.jpg" },
  { nome: "Igor dos Reis", papel: "Criador do Análises", foto: "assets/imagensEquipe/igor-dos-reis.jpg" },
  { nome: "Guilherme Borges", papel: "Criador do Regiões", foto: "assets/imagensEquipe/guilherme-borges.jpg" },
  { nome: "Rodolfo Soares", papel: "Criador do Tema", foto: "assets/imagensEquipe/rodolfo-soares.jpg" },
  { nome: "Henrique Almeida", papel: "Criador do Jogo", foto: "assets/imagensEquipe/henrique-almeida.jpg" },
];

const QUIZ = [
  {
    pergunta: "Qual estreito concentra a maior parte do petróleo exportado do Golfo Pérsico?",
    opcoes: ["Estreito de Malaca", "Estreito de Ormuz", "Canal de Suez", "Estreito de Bering"],
    correta: 1,
    explicacao: "Cerca de um quinto do petróleo consumido no mundo passa pelo Estreito de Ormuz.",
  },
  {
    pergunta: "Qual teoria afirma que controlar a Eurásia central é controlar o mundo?",
    opcoes: ["Rimland", "Poder Marítimo", "Heartland", "Destino Manifesto"],
    correta: 2,
    explicacao: "A Teoria do Heartland foi formulada por Halford Mackinder em 1904.",
  },
  {
    pergunta: "Qual país lidera a produção mundial de cobalto?",
    opcoes: ["Chile", "Austrália", "Indonésia", "República Democrática do Congo"],
    correta: 3,
    explicacao: "O Congo responde por mais de 70% da produção global de cobalto.",
  },
  {
    pergunta: "Qual bloco reúne Brasil, Argentina, Paraguai e Uruguai?",
    opcoes: ["Mercosul", "CELAC", "Aliança do Pacífico", "USMCA"],
    correta: 0,
    explicacao: "O Mercosul foi criado pelo Tratado de Assunção em 1991.",
  },
  {
    pergunta: "Qual região é chamada de 'triângulo do lítio'?",
    opcoes: ["Ásia Central", "Argentina, Bolívia e Chile", "Escandinávia", "África Austral"],
    correta: 1,
    explicacao: "O triângulo concentra mais da metade das reservas conhecidas de lítio do planeta.",
  },
];

const HERO_IMAGE_HOME = "assets/imagensHome/hero-world.jpg";
const HERO_IMAGE_REGIAO = "assets/imagensRegiao/hero-world.jpg";
