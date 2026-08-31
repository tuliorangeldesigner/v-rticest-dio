import type { Project } from './projects';

import cuupCoffeeImage from '/imagens/logo/NEW1 (1).webp?url';
import orangeMyTshirtImage from '/imagens/logo/NEW1 (2).webp?url';
import kotaBakeryImage from '/imagens/logo/NEW1 (3).webp?url';
import torradusCoffeeImage from '/imagens/logo/NEW1 (4).webp?url';
import inkBondImage from '/imagens/logo/NEW1 (5).webp?url';
import wakanImage from '/imagens/logo/NEW1 (6).webp?url';
import pokaCatImage from '/imagens/logo/NEW1 (7).webp?url';
import goodBurgerImage from '/imagens/logo/NEW1 (8).webp?url';
import turaneImage from '/imagens/logo/NEW1 (9).webp?url';
import mamaCitaImage from '/imagens/logo/NEW1 (10).webp?url';
import translateImage from '/imagens/logo/NEW1 (11).webp?url';
import streetWarriorsImage from '/imagens/logo/NEW1 (12).webp?url';
import tuzaFitwearImage from '/imagens/logo/NEW1 (13).webp?url';
import techvoiImage from '/imagens/logo/NEW1 (14).webp?url';

export const newLogoProjectIds = [
  'cuup-coffee',
  'orange-my-tshirt',
  'kota-bakery',
  'torradus-coffee',
  'inkbond',
  'wakan',
  'poka-cat',
  'good-burger',
  'turane',
  'mama-cita',
  'translate',
  'street-warriors',
  'tuza-fitwear',
  'techvoi',
] as const;

type LogoProjectInput = Omit<
  Project,
  'year' | 'heroImage' | 'thumbnail' | 'gallery' | 'galleryDisplay'
> & {
  image: string;
};

const createLogoProject = ({ image, ...project }: LogoProjectInput): Project => ({
  ...project,
  year: '2026',
  heroImage: image,
  thumbnail: image,
  gallery: [image],
  galleryDisplay: 'brand-board',
});

export const newLogoProjects: Project[] = [
  createLogoProject({
    id: 'cuup-coffee',
    title: 'CUUP Coffee',
    category: 'Identidade Visual Para Cafeteria',
    client: 'CUUP Coffee',
    image: cuupCoffeeImage,
    description:
      'Uma identidade criada para transformar a pausa do café em uma experiência mais elegante, próxima e fácil de reconhecer. A CUUP combina o desenho do grão com uma assinatura delicada, feita para acompanhar a marca do balcão à rotina do cliente.',
    challenge:
      'A cafeteria precisava transmitir qualidade sem parecer distante. O desafio era construir uma marca refinada, mas acolhedora, que funcionasse tanto na embalagem do café quanto nos pequenos momentos de consumo diário.',
    solution:
      'Criamos um monograma que une a inicial C ao grão de café e organizamos uma linguagem quente em tons de marrom e creme. O sistema ganha consistência no copo para viagem, cartão, pacote de grãos e materiais de atendimento.',
    results: [
      'Assinatura visual simples e fácil de memorizar',
      'Embalagens com percepção artesanal e premium',
      'Coerência entre ponto de venda, produto e atendimento',
      'Marca preparada para acompanhar diferentes linhas de café',
    ],
    services: ['Estratégia de Marca', 'Design de Logotipo', 'Identidade Visual', 'Packaging', 'Aplicações de Marca'],
    nextProject: 'orange-my-tshirt',
    prevProject: 'excellent-solucoes',
    keyTakeaways:
      'Uma boa marca de café não fala apenas sobre o produto: ela faz o cliente reconhecer o clima da experiência antes mesmo do primeiro gole.',
    focus: 'Experiência de Marca',
  }),
  createLogoProject({
    id: 'orange-my-tshirt',
    title: 'Orange My T-Shirt',
    category: 'Identidade Visual Para Marca de Moda',
    client: 'Orange My T-Shirt',
    image: orangeMyTshirtImage,
    description:
      'Identidade visual criada para uma marca de camisetas que valoriza conforto, personalidade e escolhas feitas para a vida real. A laranja entra como um detalhe afetivo e transforma o nome em uma assinatura própria.',
    challenge:
      'A marca precisava parecer natural e autoral sem perder força comercial. Também era importante que o logo funcionasse em etiquetas pequenas, estampas, embalagens e na comunicação de cada nova coleção.',
    solution:
      'Desenhamos uma assinatura tipográfica elegante, integrada a um símbolo de laranja com folhas. A paleta de verde, creme e terracota cria unidade em camisetas, tags, caixa de envio, papel de seda e mensagens pós-compra.',
    results: [
      'Identidade reconhecível dentro e fora das peças',
      'Etiquetas e embalagens com acabamento mais cuidadoso',
      'Sistema cromático versátil para novas coleções',
      'Experiência de compra coerente do pedido à entrega',
    ],
    services: ['Branding de Moda', 'Design de Logotipo', 'Identidade Visual', 'Design de Etiquetas', 'Packaging'],
    nextProject: 'kota-bakery',
    prevProject: 'cuup-coffee',
    keyTakeaways:
      'Quando roupa, etiqueta e embalagem contam a mesma história, o produto deixa de ser só uma peça e passa a carregar identidade.',
    focus: 'Moda e Produto',
  }),
  createLogoProject({
    id: 'kota-bakery',
    title: 'Kota Bakery',
    category: 'Identidade Visual Para Padaria Artesanal',
    client: 'Kota Bakery',
    image: kotaBakeryImage,
    description:
      'Uma marca de padaria com cheiro de fornada nova e jeito de lugar querido do bairro. Kota nasce com formas macias, personagens simpáticos e uma linguagem que aproxima o produto de quem leva o pão para casa.',
    challenge:
      'A padaria precisava comunicar frescor e cuidado artesanal sem cair nos códigos visuais mais óbvios do segmento. O sistema também deveria funcionar em produtos de tamanhos e formatos muito diferentes.',
    solution:
      'Criamos um lettering arredondado acompanhado por ilustrações leves e frases curtas. A identidade foi aplicada em sacolas, caixas, copos, embalagens para pães e doces, etiquetas, adesivos e cartão de agradecimento.',
    results: [
      'Marca acolhedora com personalidade própria',
      'Embalagens fáceis de reconhecer no balcão e na entrega',
      'Sistema ilustrado que aproxima pessoas e produtos',
      'Consistência para pães, doces, bebidas e kits',
    ],
    services: ['Estratégia de Marca', 'Design de Logotipo', 'Ilustração', 'Packaging', 'Direção de Arte'],
    nextProject: 'torradus-coffee',
    prevProject: 'orange-my-tshirt',
    keyTakeaways:
      'Em uma padaria, a identidade funciona melhor quando traduz o mesmo cuidado que o cliente percebe em uma fornada feita no dia.',
    focus: 'Afeto e Packaging',
  }),
  createLogoProject({
    id: 'torradus-coffee',
    title: "Torradu's Coffee",
    category: 'Sistema Visual Para Marca de Café',
    client: "Torradu's Coffee",
    image: torradusCoffeeImage,
    description:
      'Identidade visual pensada para uma marca de café que quer estar presente em diferentes momentos do dia, com uma aparência confiável, urbana e fácil de aplicar no ponto de venda.',
    challenge:
      'O projeto precisava organizar uma linha ampla de contato com o público sem perder unidade. Pacotes, copos, canecas, uniforme e conteúdo digital deveriam parecer parte da mesma experiência.',
    solution:
      'Construímos um símbolo direto de xícara, combinado a uma paleta de azul profundo, areia e creme. A linguagem se estende ao pacote de grãos, copos para viagem, caneca, avental, boné, cartão fidelidade e presença nas redes sociais.',
    results: [
      'Reconhecimento consistente em diferentes formatos',
      'Linha de embalagens organizada e profissional',
      'Ponto de venda com presença visual mais coesa',
      'Marca pronta para campanhas, fidelidade e expansão',
    ],
    services: ['Design de Logotipo', 'Identidade Visual', 'Packaging', 'Uniformes', 'Direção Digital'],
    nextProject: 'inkbond',
    prevProject: 'kota-bakery',
    keyTakeaways:
      'Uma marca de café cresce com mais força quando cada detalhe, do pacote ao uniforme, entrega a mesma sensação de qualidade.',
    focus: 'Sistema de Marca',
  }),
  createLogoProject({
    id: 'inkbond',
    title: 'InkBond Tattoo Care',
    category: 'Branding e Packaging Para Tattoo Care',
    client: 'InkBond Tattoo Care',
    image: inkBondImage,
    description:
      'Uma identidade de cuidados para tatuagem que respeita a atitude do universo tattoo e, ao mesmo tempo, comunica confiança para uma rotina séria de cuidado com a pele.',
    challenge:
      'A linha precisava diferenciar seus produtos sem parecer clínica demais nem depender dos clichês visuais de estúdio. Era necessário equilibrar expressão artística, legibilidade e credibilidade no uso diário.',
    solution:
      'Unimos um lettering proprietário ao gesto contínuo de uma agulha e criamos um universo preto e laranja com ilustração de lagarto. A identidade organiza cleanser, óleo nutritivo, balm, bruma calmante e hidratante diário, além de caixas, cartões e sacolas.',
    results: [
      'Linha de cuidados percebida como uma família de produtos',
      'Rótulos com diferenciação e leitura rápida',
      'Personalidade forte sem comprometer a confiança',
      'Experiência consistente da embalagem ao pós-venda',
    ],
    services: ['Estratégia de Marca', 'Design de Logotipo', 'Packaging', 'Sistema de Rótulos', 'Direção de Arte'],
    nextProject: 'wakan',
    prevProject: 'torradus-coffee',
    keyTakeaways:
      'No cuidado pós-tatuagem, a identidade precisa celebrar a arte e deixar claro que cada produto foi pensado para proteger o resultado.',
    focus: 'Linha de Produtos',
  }),
  createLogoProject({
    id: 'wakan',
    title: 'Wakan',
    category: 'Identidade Visual Para Streetwear',
    client: 'Wakan',
    image: wakanImage,
    description:
      'Marca de streetwear construída para quem usa a roupa como extensão da própria atitude. O símbolo W tem presença direta, geometria marcante e liberdade para viver sozinho em diferentes peças.',
    challenge:
      'A Wakan precisava de um logo forte o bastante para virar estampa, etiqueta e assinatura, mantendo leitura em aplicações pequenas e sem depender de efeitos ou de uma paleta extensa.',
    solution:
      'Criamos um monograma angular em preto e branco, apoiado por uma tipografia tecnológica e compacta. O sistema foi aplicado em camiseta, moletom, calça, boné, tag, caixas e tote bag.',
    results: [
      'Símbolo reconhecível mesmo sem o nome da marca',
      'Aplicações consistentes em peças e acessórios',
      'Identidade flexível para coleções monocromáticas',
      'Presença contemporânea com produção simplificada',
    ],
    services: ['Branding de Moda', 'Design de Logotipo', 'Sistema Visual', 'Aplicações em Vestuário', 'Packaging'],
    nextProject: 'poka-cat',
    prevProject: 'inkbond',
    keyTakeaways:
      'No streetwear, um símbolo forte precisa funcionar como assinatura: simples para repetir, marcante para ser desejado.',
    focus: 'Streetwear',
  }),
  createLogoProject({
    id: 'poka-cat',
    title: 'Poka Cat',
    category: 'Identidade Visual Para Pet Store',
    client: 'Poka Cat Pet Store',
    image: pokaCatImage,
    description:
      'Uma identidade divertida para uma pet store que entende o jeito curioso, carinhoso e imprevisível dos gatos. A marca nasceu para criar proximidade sem parecer infantil ou genérica.',
    challenge:
      'O desafio era transformar o universo felino em um símbolo simples, capaz de funcionar na fachada, em cartões, aplicativos, embalagens e comunicação promocional com leitura imediata.',
    solution:
      'Desenhamos um gato a partir de uma espiral, combinando o gesto do rabo com orelhas geométricas. Roxo e laranja criam contraste e energia, enquanto as versões vertical, horizontal e reduzida garantem flexibilidade.',
    results: [
      'Símbolo proprietário com forte associação ao universo felino',
      'Paleta vibrante e fácil de reconhecer',
      'Versões preparadas para digital e materiais impressos',
      'Marca próxima, alegre e pronta para diferentes produtos pet',
    ],
    services: ['Estratégia de Marca', 'Design de Logotipo', 'Identidade Visual', 'Sistema de Ícones', 'Aplicações Comerciais'],
    nextProject: 'good-burger',
    prevProject: 'wakan',
    keyTakeaways:
      'Uma marca pet cria vínculo quando o símbolo parece ter personalidade própria e continua legível em qualquer ponto de contato.',
    focus: 'Pet Branding',
  }),
  createLogoProject({
    id: 'good-burger',
    title: 'Good Burger',
    category: 'Identidade Visual Para Hamburgueria',
    client: 'Good Burger',
    image: goodBurgerImage,
    description:
      'Identidade criada para uma hamburgueria que vende mais do que uma refeição rápida: entrega sabor, praticidade e uma comunicação bem-humorada desde o primeiro contato.',
    challenge:
      'A marca precisava se destacar em delivery e ponto de venda, onde fotos de produto disputam atenção o tempo todo. O logo deveria ser direto, simpático e funcionar junto de mensagens promocionais.',
    solution:
      'Criamos uma assinatura robusta acompanhada por um gesto de aprovação, com roxo como base e verde para destacar ingredientes frescos. A linguagem aparece na embalagem do hambúrguer, caixa de batatas, selos, anúncios, social e comunicação de delivery.',
    results: [
      'Marca legível em embalagens e telas pequenas',
      'Comunicação promocional mais reconhecível',
      'Sistema de selos que organiza benefícios do produto',
      'Experiência visual coerente entre delivery e ponto de venda',
    ],
    services: ['Design de Logotipo', 'Identidade Visual', 'Packaging', 'Direção de Campanha', 'Aplicações para Delivery'],
    nextProject: 'turane',
    prevProject: 'poka-cat',
    keyTakeaways:
      'Em uma hamburgueria, a identidade precisa abrir o apetite e facilitar a escolha com a mesma rapidez de um bom atendimento.',
    focus: 'Food e Delivery',
  }),
  createLogoProject({
    id: 'turane',
    title: 'Turane',
    category: 'Identidade Visual Para Marca Lifestyle',
    client: 'Turane',
    image: turaneImage,
    description:
      'Uma identidade contemporânea para uma marca lifestyle conectada a movimento, tecnologia e presença cotidiana. O monograma T foi desenhado para circular com naturalidade entre objetos físicos e interfaces digitais.',
    challenge:
      'A Turane precisava de um símbolo simples, premium e flexível, capaz de funcionar em produtos e acessórios muito diferentes sem perder reconhecimento ou depender sempre do nome completo.',
    solution:
      'Construímos um T modular com cortes precisos e uma combinação de roxo profundo e amarelo vibrante. O sistema se adapta a smartwatch, chaveiro, lata, cartão, aplicativo, caneca e padrões de marca.',
    results: [
      'Monograma forte em aplicações pequenas',
      'Contraste cromático com alta identificação',
      'Sistema versátil para produtos físicos e digitais',
      'Presença premium sem perder energia visual',
    ],
    services: ['Estratégia de Marca', 'Design de Logotipo', 'Identidade Visual', 'Design de Produto', 'Aplicações Digitais'],
    nextProject: 'mama-cita',
    prevProject: 'good-burger',
    keyTakeaways:
      'Marcas lifestyle ganham valor quando o símbolo parece pertencer naturalmente a cada produto, tela e momento de uso.',
    focus: 'Lifestyle e Tecnologia',
  }),
  createLogoProject({
    id: 'mama-cita',
    title: 'Mama Cita',
    category: 'Identidade com Mascote Para Café',
    client: 'Mama Cita',
    image: mamaCitaImage,
    description:
      'Uma marca de café calorosa, expressiva e cheia de personalidade. Mama Cita transforma a própria xícara em personagem para criar conversa, afeto e lembrança em cada encontro com o público.',
    challenge:
      'O projeto precisava comunicar carinho e energia sem parecer infantil. Além do logo principal, a marca necessitava de expressões e versões capazes de acompanhar produto, atendimento e conteúdo digital.',
    solution:
      'Criamos uma mascote-xícara com diferentes emoções, apoiada por tipografia arredondada e uma paleta de café, caramelo, creme e verde suave. O universo se estende ao pacote de grãos, avental, copo para viagem, adesivos e redes sociais.',
    results: [
      'Mascote capaz de sustentar diferentes mensagens',
      'Embalagem de café mais próxima e memorável',
      'Conteúdo digital com linguagem visual própria',
      'Sistema flexível para atendimento e campanhas sazonais',
    ],
    services: ['Criação de Mascote', 'Design de Logotipo', 'Identidade Visual', 'Packaging', 'Direção de Conteúdo'],
    nextProject: 'translate',
    prevProject: 'turane',
    keyTakeaways:
      'Uma mascote bem construída faz a marca falar com o público antes mesmo de qualquer legenda.',
    focus: 'Mascote e Expressão',
  }),
  createLogoProject({
    id: 'translate',
    title: 'Translate',
    category: 'Branding Para Cultura Urbana',
    client: 'Translate Urban Signal',
    image: translateImage,
    description:
      'Identidade para uma marca urbana que transforma atitude, movimento e referências de rua em uma linguagem visual direta. A assinatura gestual traz energia humana para um sistema gráfico preciso.',
    challenge:
      'A Translate precisava parecer espontânea sem perder consistência. O desafio era equilibrar lettering manual, estética editorial e uma cor neon forte em peças de moda e comunicação.',
    solution:
      'Criamos um wordmark de pincel acompanhado por um símbolo T compacto. Preto, branco e verde neon estruturam boné, tote bag, cartões, tags e peças editoriais com fotografia em alto contraste.',
    results: [
      'Assinatura autoral com energia urbana',
      'Símbolo compacto para etiquetas e avatares',
      'Sistema editorial reconhecível em campanhas',
      'Aplicações de moda com contraste e unidade',
    ],
    services: ['Estratégia de Marca', 'Lettering', 'Identidade Visual', 'Direção Editorial', 'Aplicações em Moda'],
    nextProject: 'street-warriors',
    prevProject: 'mama-cita',
    keyTakeaways:
      'A estética urbana se torna marca quando o gesto espontâneo encontra um sistema que pode ser repetido sem perder verdade.',
    focus: 'Urban Culture',
  }),
  createLogoProject({
    id: 'street-warriors',
    title: 'Street Warriors',
    category: 'Identidade Visual Para Comunidade Urbana',
    client: 'Street Warriors',
    image: streetWarriorsImage,
    description:
      'Uma identidade criada para reunir pessoas que vivem a rua como espaço de expressão, atitude e pertencimento. O olhar no centro do símbolo reforça presença e consciência coletiva.',
    challenge:
      'A marca precisava ter impacto de equipe e flexibilidade de lifestyle. Deveria funcionar em patches, roupa, boné, skate e peças gráficas sem perder leitura ou virar apenas uma estampa isolada.',
    solution:
      'Desenvolvemos uma tipografia condensada de alto impacto combinada ao símbolo de olho e balão de fala. Azul, preto e branco organizam patches bordados, camiseta, boné, shape de skate e material editorial.',
    results: [
      'Identidade com presença de grupo e senso de pertencimento',
      'Símbolos preparados para bordado e impressão',
      'Aplicações consistentes em moda e skate',
      'Linguagem visual direta para ações da comunidade',
    ],
    services: ['Design de Logotipo', 'Identidade Visual', 'Design de Patches', 'Aplicações em Vestuário', 'Direção de Arte'],
    nextProject: 'tuza-fitwear',
    prevProject: 'translate',
    keyTakeaways:
      'Uma marca de comunidade ganha força quando cada peça funciona como sinal de pertencimento, não apenas como divulgação.',
    focus: 'Comunidade e Movimento',
  }),
  createLogoProject({
    id: 'tuza-fitwear',
    title: 'Tuza Fitwear',
    category: 'Identidade Visual Para Moda Fitness',
    client: 'Tuza Fitwear',
    image: tuzaFitwearImage,
    description:
      'Identidade para uma marca fitness que combina movimento, feminilidade e bom humor. Tuza foi pensada para acompanhar uma rotina ativa sem abrir mão de estilo ou personalidade.',
    challenge:
      'O projeto precisava fugir da aparência técnica e impessoal comum no segmento. A marca deveria conversar com mulheres reais, funcionar nas roupas e criar uma experiência marcante também fora do treino.',
    solution:
      'Criamos uma assinatura tipográfica com referência felina e uma linguagem vibrante em laranja e tons quentes. O sistema aparece em conjuntos esportivos, bolsa, sacola, squeeze, estampa e materiais de compra.',
    results: [
      'Marca feminina com atitude e personalidade',
      'Assinatura adaptável a roupas e acessórios',
      'Experiência de compra mais reconhecível',
      'Sistema visual preparado para coleções e comunidade',
    ],
    services: ['Branding de Moda', 'Design de Logotipo', 'Identidade Visual', 'Aplicações em Produto', 'Packaging'],
    nextProject: 'techvoi',
    prevProject: 'street-warriors',
    keyTakeaways:
      'Uma marca fitness se aproxima das pessoas quando movimento e estilo parecem parte da mesma rotina, dentro e fora do treino.',
    focus: 'Fitwear e Lifestyle',
  }),
  createLogoProject({
    id: 'techvoi',
    title: 'Techvoi',
    category: 'Identidade Visual Para Tecnologia',
    client: 'Techvoi',
    image: techvoiImage,
    description:
      'Uma identidade direta para uma empresa de tecnologia que transforma movimento, evolução e direção em uma presença visual segura. O resultado é uma marca preparada para ambientes digitais e relações corporativas.',
    challenge:
      'A Techvoi precisava comunicar inovação sem recorrer a símbolos tecnológicos genéricos. A marca também deveria manter clareza em telas, apresentações, cartões e materiais institucionais.',
    solution:
      'Desenhamos um símbolo T baseado em avanço e direção, acompanhado por uma tipografia limpa e objetiva. Vermelho, preto e branco criam contraste em smartphone, tablet, cartões, envelope e demais pontos de contato corporativos.',
    results: [
      'Símbolo proprietário com leitura rápida',
      'Presença consistente em telas e materiais impressos',
      'Contraste visual alinhado a inovação e confiança',
      'Sistema preparado para comunicação comercial e institucional',
    ],
    services: ['Estratégia de Marca', 'Design de Logotipo', 'Identidade Visual', 'Aplicações Digitais', 'Materiais Corporativos'],
    nextProject: 'luminary',
    prevProject: 'tuza-fitwear',
    keyTakeaways:
      'Em tecnologia, inovação parece mais confiável quando a identidade comunica direção com clareza, sem excesso de efeitos.',
    focus: 'Tecnologia e Direção',
  }),
];
