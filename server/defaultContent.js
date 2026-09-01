/** Defaults sem imports do Vite — usado para seed no banco */
export const serverDefaultContent = {
  meta: {
    title: 'Detalhe - Cortinas e Persianas Sob Medida',
    description:
      'Transforme seus ambientes com cortinas e persianas de alta qualidade, instaladas por especialistas. Solicite um orçamento!',
  },
  contact: {
    whatsappUrl: 'https://wa.me/5571981018563',
    whatsappDisplay: '+55 71 98101-8563',
    instagramUrl: 'https://instagram.com/detalhe_cortinas',
    instagramHandle: '@detalhe_cortinas',
  },
  brand: {
    name: 'Detalhe Cortinas & Persianas',
    logo: '/src/assets/img/Detalhe-logo.png',
    description:
      'Especialistas em transformar ambientes com cortinas e persianas sob medida, combinando design e funcionalidade.',
  },
  header: {
    ctaText: 'Solicite um orçamento',
    ctaLink: '#contact',
    navLinks: [
      { href: '#services', text: 'Serviços' },
      { href: '#about', text: 'Sobre Nós' },
      { href: '#gallery', text: 'Galeria' },
      { href: '#contact', text: 'Contato' },
    ],
  },
  hero: {
    headingLine1: 'Elegância e Conforto com Nossas',
    headingLine2: 'Cortinas & Persianas',
    subtitle:
      'Transforme seus ambientes com soluções sob medida, design sofisticado e instalação profissional.',
    backgroundImage: 'https://images.unsplash.com/photo-1680007889201-114ac772447d',
    backgroundAlt: 'Persiana elegante bem instalada em uma sala de estar moderna e iluminada',
    overlayColor: '#000C66',
    overlayOpacity: 50,
    primaryButton: { label: 'Solicite um Orçamento', link: 'https://wa.me/5571981018563' },
    secondaryButton: { label: 'Seguir no Instagram', link: 'https://instagram.com/detalhe_cortinas' },
  },
  services: {
    headingPrefix: 'Nossos',
    headingAccent: 'Serviços Especializados',
    subtitle:
      'Soluções completas em cortinas e persianas para valorizar cada detalhe do seu espaço.',
    background: { type: 'class', value: 'bg-muted' },
    items: [
      {
        id: 'svc-1',
        icon: 'ruler',
        title: 'Cortinas e Persianas sob medida',
        description:
          'Criamos cortinas personalizadas que se encaixam perfeitamente em seu ambiente e complementam seu estilo de decoração.',
        details: [
          'Tecidos nobres e variados',
          'Modelos clássicos e modernos',
          'Consultoria especializada',
          'Materiais duráveis e de alta qualidade',
          'Opções manuais e motorizadas',
          'Bloqueio de luz e privacidade',
        ],
      },
      {
        id: 'svc-2',
        icon: 'settings',
        title: 'Manutenção, Instalação & Lavagem',
        description: 'Serviço de cortinas e persianas manuais e motorizadas.',
        details: [
          'Manutenção preventiva e corretiva',
          'Lavagem profissional especializada',
          'Instalação rápida e precisa',
        ],
      },
      {
        id: 'svc-3',
        icon: 'palette',
        title: 'Consultoria de Design',
        description:
          'Nossos especialistas ajudam você a escolher as melhores opções de cortinas e persianas para cada ambiente.',
        details: [
          'Análise do espaço e iluminação',
          'Harmonização com o décor existente',
          'Soluções funcionais e estéticas',
        ],
      },
    ],
  },
  about: {
    eyebrow: 'Quem Somos',
    headingPrefix: 'Paixão por Detalhes, Compromisso com a',
    headingAccent: 'Qualidade',
    paragraph1:
      'Na Detalhe Cortinas & Persianas, acreditamos que cada ambiente conta uma história. Há mais de uma década, dedicamo-nos a transformar casas e escritórios com cortinas e persianas que unem estética, funcionalidade e o mais alto padrão de qualidade.',
    paragraph2:
      'Nossa equipe de especialistas está pronta para entender suas necessidades e oferecer soluções personalizadas, desde a escolha dos materiais até a instalação impecável. Valorizamos a confiança de nossos clientes e buscamos superar expectativas em cada projeto.',
    image: 'https://images.unsplash.com/photo-1677268289056-09dffbac755b',
    imageAlt:
      'Equipe Detalhe Cortinas & Persianas sorrindo em um ambiente de showroom com diversas amostras de tecidos',
    background: { type: 'class', value: 'bg-background' },
    stats: [
      { id: 'stat-1', icon: 'award', value: '10+', label: 'Anos de Experiência' },
      { id: 'stat-2', icon: 'users', value: '500+', label: 'Clientes Satisfeitos' },
      { id: 'stat-3', icon: 'heart', value: '98%', label: 'Índice de Aprovação' },
      { id: 'stat-4', icon: 'trendingUp', value: 'Inovação', label: 'Constante' },
    ],
  },
  gallery: {
    headingPrefix: 'Inspire-se em Nossos',
    headingAccent: 'Projetos',
    subtitle:
      'Veja como nossas cortinas e persianas transformam ambientes com beleza e funcionalidade.',
    ctaText: 'Confira mais projetos no instagram',
    ctaLink: 'https://instagram.com/detalhe_cortinas',
    background: { type: 'class', value: 'bg-muted' },
    items: [
      { id: 'gal-1', src: '/src/assets/img/002.jpeg', alt: 'Projeto de cortina e persiana sob medida 002' },
      { id: 'gal-2', src: '/src/assets/img/003.jpeg', alt: 'Projeto de cortina e persiana sob medida 003' },
      { id: 'gal-3', src: '/src/assets/img/6.jpeg', alt: 'Projeto de cortina e persiana sob medida 004' },
    ],
  },
  contact: {
    heading: 'Pronto para Transformar Seu Ambiente?',
    paragraph:
      'Entre em contato conosco hoje mesmo para um orçamento sem compromisso. Nossa equipe está pronta para te ajudar a encontrar a solução perfeita em cortinas e persianas.',
    ctaText: 'Quero fazer um orçamento',
    ctaLink: 'https://wa.me/5571981018563',
    background: { type: 'gradient', from: 'hsl(var(--primary))', to: 'hsl(var(--secondary))' },
  },
  footer: {
    navHeading: 'Navegação',
    contactHeading: 'Entre em Contato',
    copyright: 'Detalhe Cortinas & Persianas. Todos os direitos reservados.',
    developerName: 'Luan Belon',
    developerUrl: 'https://luanbelondev.com',
    background: { type: 'class', value: 'bg-muted' },
    navLinks: [
      { href: '#services', text: 'Nossos Serviços' },
      { href: '#about', text: 'Sobre Nós' },
      { href: '#gallery', text: 'Galeria' },
      { href: '#contact', text: 'Solicitar Orçamento' },
    ],
  },
};
