/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';

type ThemeMode = 'obsidian' | 'amethyst';
type NavSection = 'inicio' | 'sobre-mi' | 'experiencia' | 'proyectos' | 'habilidades' | 'contacto';
type ProjectCategory = 'all' | 'cloud' | 'digital' | 'erp';

interface ProjectItem {
  id: string;
  category: Exclude<ProjectCategory, 'all'>;
  badge: string;
  title: string;
  image: string;
  imageAlt: string;
  challenge: string;
  solution: string;
  metric1Label: string;
  metric1Value: string;
  metric2Label: string;
  metric2Value: string;
  tags: string[];
  architectureNodes: string[];
  executiveOutcome: string;
}

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1XA3VIyabpueIj5iyk-xwPEelnrBRFa9DsOxtvsw2mHPxt1Z5tC-O5OZjUGQNCZNKzSVyHS9pH5g8Tybbc-9rWpYKkJTxBSJ2SUYjt45_OUTodhj6NWqFovXVHp5zWHgJ577-rHXDZA7Znd5JazHTDKZ7LIKIvEFoXNifzZ8jlWFIBYuPEZNG2LduMVvRYLO4RSuAsjtscgxqW8S61itTkIZ58czPH3tbpzCqTdUBWKWHJ768f1nKTvbDo';

const PROJECTS: ProjectItem[] = [
  {
    id: 'core-bancario',
    category: 'cloud',
    badge: 'Fintech • AWS',
    title: 'Modernización del Core Transaccional Bancario',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD6lzgABBTE9H72mTZozcAQXktmVkxMMB5vm_bqtyvEwJKZIAZt18YKqvVGRSv3ojO4Bz0-anu1bIiBagz92TJWlnJ-r5FAerWMFSEtHTnl6PFebU9zhHDadge8M5yB5Zpwm8azvcbM1CIbglwdRwp9tFLcV5aTwzCCdwn0pl7AhwFMNXOSkgxPFAQ77OWBWLO3KVCWw5CDCsJ39imQeCGKZ9iuBtUiDloiMoe9rBceffZG0ec75f8e-g',
    imageAlt:
      'Dark high-tech server racks in an enterprise data center glowing with deep purple and violet LED lights, cinematic photography, high dynamic range, technical elegance',
    challenge:
      'Caídas frecuentes en picos de fin de mes con latencias de 1.8 segundos por transacción.',
    solution:
      'Transición a microservicios en Amazon EKS, Kafka para streaming de eventos y DynamoDB global.',
    metric1Label: 'Latencia',
    metric1Value: '−68%',
    metric2Label: 'Carga Diaria',
    metric2Value: '15M Trans.',
    tags: ['EKS', 'Kafka', 'DynamoDB'],
    architectureNodes: [
      'API Gateway + WAF Zero Trust',
      'Amazon EKS Multi-AZ Cluster',
      'Apache Kafka Event Mesh',
      'DynamoDB Global Tables',
    ],
    executiveOutcome:
      'Ahorro anualizado de $1.4M USD en licenciamiento mainframe y disponibilidad certificada del 99.99% durante cierres quincenales.',
  },
  {
    id: 'cadena-suministro',
    category: 'digital',
    badge: 'Logística • Azure • IoT',
    title: 'Automatización Integral de Cadena de Suministro',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZQNHiYencxefGszqzG018ZPKncyCzNXmwYlZk6QYIj-VtlVhJj7WiZVxbj3G_3RTRD1O6IpLDHaUW06t659Gn2to4d6HACWqlnHx8TkV-kQTHHvHo5YbBAUMtbZPmnwInP5uJKd046xQth_3rghwcIFZmzJ1s-VvZ8aostGs2UrrcCobKQeajvEqHKucW8BOtqpOlt96ylpg4CPh1F9acSRxG6dIAB8wEcZ_MnMRKlivsN23qKJpatQ',
    imageAlt:
      'Modern automated logistics fulfillment center with smart robotics, violet ambient indicator lighting, and clean digital telemetry dashboards in background',
    challenge:
      'Inconsistencia en inventario inter-plantas y pérdida de trazabilidad en cadena fría perecedera.',
    solution:
      'Telemetría IoT en Azure Hub enlazada a SAP S/4HANA mediante orquestador de eventos.',
    metric1Label: 'Reducción Mermas',
    metric1Value: '−24%',
    metric2Label: 'Retorno Inversión',
    metric2Value: '8 Meses',
    tags: ['Azure IoT', 'SAP S/4', 'CosmosDB'],
    architectureNodes: [
      'Sensores RFID & Telemetría Fría',
      'Azure IoT Hub & Stream Analytics',
      'CosmosDB Real-Time Twin',
      'Conector Bidireccional SAP S/4HANA',
    ],
    executiveOutcome:
      'Trazabilidad en tiempo real para 14 centros de distribución y amortización completa del Capex en 8 meses.',
  },
  {
    id: 'plataforma-omnicanal',
    category: 'erp',
    badge: 'Retail • Snowflake • ERP',
    title: 'Plataforma Omnicanal de Inteligencia Comercial',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5U7xSNPwjSUt8trdR0D5tUN22armm9UzKWfwDBz1vXndrQbvbRRPKW0g3zt4li3WnWN0EWOzTTRLOfXj8zn3N5mtSvY1AelA3IvfboHMSH6GI0bkEhZH6_1v04SldR9UN1y6P_dD1Cgcmm-ktI851exwi0qi_w7sRvdT3H8C-3x6pJ_cgU0Sbh3oLJ9X6Jvh0MGToDHtYkj-giEQPRD86mTqkNHLExWxwzKk-AUp45GlWelHD5nKFUQ',
    imageAlt:
      'Modern executive data analytics dashboard glowing on multiple ultra-wide monitors showing real-time revenue and supply chain graphs in purple and dark shades',
    challenge:
      'Datos dispersos en 6 sistemas de punto de venta que imposibilitaban la personalización B2B.',
    solution:
      'Modern Data Stack con Snowflake, dbt y capas de servicio API ultra rápidas para clientes.',
    metric1Label: 'Ventas Recurrentes',
    metric1Value: '+41%',
    metric2Label: 'Tiempo Consulta',
    metric2Value: '< 150ms',
    tags: ['Snowflake', 'dbt', 'Node.js'],
    architectureNodes: [
      'Ingesta POS & ERP Multi-Región',
      'Snowflake Data Cloud + dbt Core',
      'Capa Caché Redis & GraphQL/Node.js',
      'Portal Ejecutivo & Motor B2B',
    ],
    executiveOutcome:
      'Unificación de 18M de perfiles comerciales y aumento del 41% en recompra B2B durante el primer trimestre.',
  },
];

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('amethyst');
  const [activeNav, setActiveNav] = useState<NavSection>('inicio');
  const [projectFilter, setProjectFilter] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    isError: boolean;
  }>({
    visible: false,
    message: 'Mensaje del sistema',
    isError: false,
  });
  const toastTimerRef = useRef<number | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    type: false,
    message: false,
  });
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success'>('idle');

  const isAmethyst = theme === 'amethyst';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Update active nav on scroll
  useEffect(() => {
    const sectionIds: NavSection[] = [
      'inicio',
      'sobre-mi',
      'experiencia',
      'proyectos',
      'habilidades',
      'contacto',
    ];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveNav(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const showToast = (msg: string, isError = false) => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToast({ visible: true, message: msg, isError });
    toastTimerRef.current = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
  };

  const scrollToSection = (section: NavSection, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveNav(section);
    setMobileMenuOpen(false);
    if (section === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(section);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyEmail = () => {
    const emailText = 'alexandre.morales@vanguard-it.io';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(emailText)
        .then(() => {
          showToast('Correo copiado al portapapeles con éxito');
        })
        .catch(() => {
          showToast('No se pudo copiar. Seleccione manualmente.', true);
        });
    } else {
      showToast('Correo copiado al portapapeles con éxito');
    }
  };

  const handleDownloadCV = () => {
    showToast('Generando paquete VCF / Resumen Ejecutivo...');
    const vcfContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Morales;Alexandre;;;MBA',
      'FN:Alexandre Morales — Vanguard IT',
      'ORG:Vanguard IT Enterprise Architecture',
      'TITLE:Lead Enterprise Architect & IT Business Consultant',
      'TEL;TYPE=WORK,VOICE:+525541698200',
      'EMAIL;TYPE=PREF,INTERNET:alexandre.morales@vanguard-it.io',
      'ADR;TYPE=WORK:;;Ciudad de México;CDMX;;México',
      'NOTE:Consultoría Estratégica de TI, Arquitectura Cloud (AWS/Azure), FinOps y Transformación Digital.',
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vcfContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Alexandre_Morales_Vanguard_IT.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {
      name: !name.trim(),
      email: !emailRegex.test(email.trim()),
      type: !projectType,
      message: !message.trim() || message.trim().length < 10,
    };

    setErrors(newErrors);
    const isValid = !Object.values(newErrors).some(Boolean);

    if (!isValid) {
      showToast('Por favor, revise los campos marcados en rojo.', true);
      return;
    }

    setSubmitState('loading');
    window.setTimeout(() => {
      setSubmitState('success');
      showToast('Recibido: Alexandre Morales le contactará en menos de 24 horas.');
      setName('');
      setEmail('');
      setProjectType('');
      setMessage('');

      window.setTimeout(() => {
        setSubmitState('idle');
      }, 4000);
    }, 1200);
  };

  const filteredProjects = PROJECTS.filter(
    (p) => projectFilter === 'all' || p.category === projectFilter
  );

  const navItems: { id: NavSection; label: string }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'sobre-mi', label: 'Sobre Mí' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col transition-colors duration-300">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-colors duration-300 ${
          isAmethyst
            ? 'bg-[#120b1fef] shadow-[0_4px_24px_rgba(10,5,18,0.7)] border-b border-[#382256]'
            : 'bg-[#0d0817dd] shadow-[0_1px_8px_rgba(0,0,0,0.5)] border-b border-[#2e1c4a]'
        }`}
      >
        <div className="h-20 max-w-[1320px] mx-auto px-gutter-mobile lg:px-gutter flex items-center justify-between gap-space-md">
          {/* Left Brand & Availability */}
          <div className="flex items-center gap-space-md shrink-0">
            <a
              href="#inicio"
              onClick={(e) => scrollToSection('inicio', e)}
              className="flex items-center gap-space-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg transition-transform hover:opacity-95"
            >
              {!logoError ? (
                <img
                  alt="Logo Profesional TI Negocios"
                  src={LOGO_URL}
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                  className={`h-8 w-auto object-contain ${
                    isAmethyst
                      ? 'rounded-md ring-1 ring-primary/40 shadow-[0_0_12px_rgba(143,78,237,0.35)]'
                      : ''
                  }`}
                />
              ) : (
                <div className="h-8 px-2.5 rounded-md bg-[#1a102d] border border-primary/60 flex items-center gap-1.5 shadow-[0_0_12px_rgba(143,78,237,0.35)]">
                  <span className="text-white font-label-sm font-bold tracking-tighter">ALEX</span>
                  <span className="text-primary font-label-sm font-bold tracking-tighter">.DEV</span>
                </div>
              )}
              <div className="flex flex-col">
                <span
                  className={`font-headline-sm text-headline-sm tracking-tight leading-tight ${
                    isAmethyst ? 'text-[#ece4f7] font-semibold' : 'text-on-surface'
                  }`}
                >
                  Vanguard IT
                </span>
                <span
                  className={`font-label-sm text-label-sm uppercase tracking-widest ${
                    isAmethyst ? 'text-[#a855f7]' : 'text-outline'
                  }`}
                >
                  Enterprise Architecture
                </span>
              </div>
            </a>

            <div
              className={`hidden xl:flex items-center gap-space-xs px-space-sm py-1 rounded-full ${
                isAmethyst
                  ? 'bg-surface-container border border-[#4c2d75]/70'
                  : 'bg-surface-container-low border border-outline-variant/40'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span
                className={`font-label-sm text-label-sm ${
                  isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                }`}
              >
                Available for Advisory &amp; Projects
              </span>
            </div>
          </div>

          {/* Center Navigation */}
          <nav
            className={`hidden lg:flex items-center gap-space-xs p-1 rounded-lg ${
              isAmethyst
                ? 'bg-[#180f28]/80 border border-[#382256]'
                : 'bg-surface-container-lowest/60 border border-outline-variant/30'
            }`}
          >
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => scrollToSection(item.id, e)}
                  className={`px-space-sm py-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap ${
                    isActive
                      ? isAmethyst
                        ? 'bg-secondary-container text-[#e0caff] border border-[#5f2e96] font-semibold rounded-lg shadow-sm text-body-sm'
                        : 'bg-secondary-container text-on-secondary-container font-semibold rounded-lg text-body-sm'
                      : isAmethyst
                      ? 'rounded-lg text-[#b8a7ce] hover:text-[#ece4f7] hover:bg-[#281a42] font-headline-sm text-body-sm'
                      : 'rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-headline-sm text-body-sm'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-space-sm sm:gap-space-md shrink-0">
            <a
              href="#contacto"
              onClick={(e) => scrollToSection('contacto', e)}
              className={`hidden sm:inline-flex items-center justify-center px-space-md py-2 rounded-lg font-headline-sm text-body-sm font-semibold tracking-wide transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface whitespace-nowrap ${
                isAmethyst
                  ? 'bg-gradient-to-r from-primary-container to-[#a855f7] text-white shadow-[0_0_22px_rgba(143,78,237,0.45)] hover:shadow-[0_0_30px_rgba(192,132,252,0.65)] hover:brightness-110'
                  : 'bg-primary text-on-primary shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_28px_rgba(208,188,255,0.5)] hover:bg-primary-fixed'
              }`}
            >
              Contactar / Agendar
            </a>

            {/* Theme Switcher Button (User Avatar Pill) */}
            <button
              type="button"
              onClick={() => {
                const next = theme === 'amethyst' ? 'obsidian' : 'amethyst';
                setTheme(next);
                showToast(
                  next === 'amethyst'
                    ? 'Tema activo: Nocturne Amethyst (Pantalla 2)'
                    : 'Tema activo: Obsidian Violet (Pantalla 1)'
                );
              }}
              title={
                isAmethyst
                  ? 'Cambiar a vista Obsidian Violet (Pantalla 1)'
                  : 'Cambiar a vista Nocturne Amethyst (Pantalla 2)'
              }
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer ${
                isAmethyst
                  ? 'bg-primary-container/80 ring-1 ring-primary shadow-[0_0_12px_rgba(143,78,237,0.5)] text-white'
                  : 'bg-primary text-on-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Abrir menú de navegación"
              className="lg:hidden p-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface hover:text-primary focus:outline-none"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden px-gutter-mobile py-space-md border-b ${
              isAmethyst
                ? 'bg-[#120b1f] border-[#382256]'
                : 'bg-surface-container-lowest border-outline-variant/30'
            }`}
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(item.id, e)}
                  className={`px-space-md py-2.5 rounded-lg font-headline-sm text-body-sm transition-colors ${
                    activeNav === item.id
                      ? 'bg-secondary-container text-on-secondary-container font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* FLOATING SCREEN / THEME SWITCHER PILL (Bottom Left) */}
      <div className="fixed bottom-5 left-5 z-40 flex items-center gap-1 p-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md border border-outline-variant/50 shadow-2xl">
        <button
          type="button"
          onClick={() => setTheme('obsidian')}
          className={`px-3 py-1 rounded-full font-label-sm text-[11px] transition-all cursor-pointer whitespace-nowrap ${
            !isAmethyst
              ? 'bg-primary text-on-primary font-semibold shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Obsidian Violet
        </button>
        <button
          type="button"
          onClick={() => setTheme('amethyst')}
          className={`px-3 py-1 rounded-full font-label-sm text-[11px] transition-all cursor-pointer whitespace-nowrap ${
            isAmethyst
              ? 'bg-gradient-to-r from-primary-container to-[#a855f7] text-white font-semibold shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Nocturne Amethyst
        </button>
      </div>

      {/* MAIN CONTENT */}
      <main id="inicio" className="w-full pt-20 bg-surface flex-1">
        <div className="flex flex-col w-full">
          {/* Dynamic Notification Toast Container */}
          <div
            id="system-toast"
            role="status"
            aria-live="polite"
            className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 pointer-events-none flex items-center gap-space-sm px-space-md py-space-sm rounded-xl ${
              toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
            } ${
              isAmethyst
                ? 'bg-surface-container-high border border-[#4c2d75] text-[#ece4f7] shadow-[0_12px_32px_rgba(8,3,16,0.8)]'
                : 'bg-surface-container-high text-on-surface shadow-2xl'
            }`}
          >
            <span
              id="toast-icon"
              className={`material-symbols-outlined text-[20px] ${
                toast.isError ? 'text-error' : 'text-primary'
              }`}
            >
              {toast.isError ? 'error' : 'check_circle'}
            </span>
            <span id="toast-message" className="font-body-sm text-body-sm">
              {toast.message}
            </span>
          </div>

          {/* SECTION 1: HERO / PRESENTACIÓN */}
          <section className="relative w-full max-w-[1320px] mx-auto px-gutter-mobile lg:px-gutter py-space-xl lg:py-space-xxl">
            {/* Ambient Violet Glow Accent */}
            <div
              className={`absolute top-1/4 -right-24 w-96 h-96 rounded-full pointer-events-none ${
                isAmethyst
                  ? 'bg-primary-container/20 blur-[140px]'
                  : 'bg-primary-container/10 blur-[120px]'
              }`}
            ></div>
            <div
              className={`absolute top-10 left-1/4 w-80 h-80 rounded-full pointer-events-none ${
                isAmethyst
                  ? 'bg-secondary-container/30 blur-[120px]'
                  : 'bg-secondary-container/15 blur-[100px]'
              }`}
            ></div>

            <div className="relative z-10 flex flex-col gap-space-lg">
              {/* Status pill */}
              <div
                className={`inline-flex items-center gap-space-sm self-start px-space-md py-1.5 rounded-full bg-surface-container-low shadow-sm ${
                  isAmethyst ? 'border border-[#382256]' : ''
                }`}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span
                  className={`font-label-md text-label-md font-medium tracking-wide ${
                    isAmethyst ? 'text-[#d9b9ff]' : 'text-on-surface'
                  }`}
                >
                  Disponible para Consultoría Estratégica &amp; Proyectos Q2/Q3
                </span>
              </div>

              {/* Main Headline & Subtitle */}
              <div className="max-w-4xl flex flex-col gap-space-md">
                <h1
                  className={`font-headline-xl tracking-tight leading-tight ${
                    isAmethyst
                      ? 'text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#ece4f7]'
                      : 'text-headline-xl text-on-surface'
                  }`}
                >
                  Estrategia Tecnológica con{' '}
                  <span
                    className={`text-primary underline decoration-wavy underline-offset-8 ${
                      isAmethyst ? 'decoration-[#8f4eed]/60' : 'decoration-primary/30'
                    }`}
                  >
                    Impacto Directo
                  </span>{' '}
                  en el Negocio.
                </h1>
                <p
                  className={`font-body-lg text-body-lg max-w-3xl leading-relaxed ${
                    isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                  }`}
                >
                  Diseño e implemento arquitecturas de TI, modernización en la nube y optimización
                  de procesos digitales que aumentan el EBITDA y aceleran la rentabilidad operativa
                  de empresas medianas y globales.
                </p>
              </div>

              {/* Primary & Secondary Actions */}
              <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                <a
                  href="#proyectos"
                  onClick={(e) => scrollToSection('proyectos', e)}
                  className={`inline-flex items-center gap-space-sm px-space-lg py-3.5 rounded-xl text-white font-headline-sm text-body-md font-semibold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap ${
                    isAmethyst
                      ? 'bg-gradient-to-r from-primary-container via-[#9333ea] to-[#a855f7] shadow-[0_4px_20px_rgba(143,78,237,0.4)] hover:shadow-[0_6px_28px_rgba(143,78,237,0.6)]'
                      : 'bg-gradient-to-r from-inverse-primary to-primary-container shadow-xl hover:shadow-2xl'
                  }`}
                >
                  <span>Explorar Casos de Éxito</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                </a>

                <button
                  id="btn-download-cv"
                  type="button"
                  onClick={handleDownloadCV}
                  className={`inline-flex items-center gap-space-sm px-space-lg py-3.5 rounded-xl bg-surface-container-high font-headline-sm text-body-md font-medium shadow-md transition-all duration-200 hover:bg-surface-container-highest active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer whitespace-nowrap ${
                    isAmethyst
                      ? 'border border-[#4c2d75] text-[#ece4f7] hover:border-primary/50'
                      : 'text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    download
                  </span>
                  <span>Descargar Curriculum / VCF</span>
                </button>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md pt-space-lg">
                {[
                  {
                    label: 'Trayectoria',
                    value: '+12 Años',
                    sub: 'Consultoría TI, Gobierno & Finanzas',
                  },
                  {
                    label: 'Eficiencia Financiera',
                    value: '$4.2M USD',
                    sub: 'Ahorros certificados en migración cloud',
                  },
                  {
                    label: 'Alcance Global',
                    value: '35+ Proyectos',
                    sub: 'Ejecuciones en LATAM, EE. UU. y Europa',
                  },
                  {
                    label: 'Disponibilidad Crítica',
                    value: '99.98% SLA',
                    sub: 'Sistemas core y arquitecturas resilientes',
                  },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className={`p-space-md rounded-xl flex flex-col gap-space-xs transition-transform hover:-translate-y-1 ${
                      isAmethyst
                        ? 'bg-[#19102b] border border-[#382256] shadow-[0_4px_16px_rgba(14,7,24,0.4)] hover:border-[#4c2d75]'
                        : 'bg-surface-container-low shadow-sm'
                    }`}
                  >
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
                      {metric.label}
                    </span>
                    <div
                      className={`font-headline-lg font-bold tracking-tight tabular-nums ${
                        isAmethyst
                          ? 'text-3xl text-[#ece4f7]'
                          : 'text-headline-lg text-on-surface'
                      }`}
                    >
                      {metric.value}
                    </div>
                    <p
                      className={`font-body-sm text-body-sm ${
                        isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                      }`}
                    >
                      {metric.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 2: SOBRE MÍ */}
          <section
            id="sobre-mi"
            className={`w-full py-space-xxl ${
              isAmethyst
                ? 'bg-[#180f28] border-y border-[#382256]'
                : 'bg-surface-container-lowest'
            }`}
          >
            <div className="max-w-[1320px] mx-auto px-gutter-mobile lg:px-gutter flex flex-col gap-space-xl">
              <div className="flex flex-col gap-space-xs max-w-2xl">
                <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
                  Filosofía de Trabajo
                </span>
                <h2
                  className={`font-headline-lg ${
                    isAmethyst
                      ? 'text-2xl sm:text-3xl font-bold text-[#ece4f7]'
                      : 'text-headline-lg text-on-surface'
                  }`}
                >
                  Cerrando la brecha entre Código y Balance General
                </h2>
                <p
                  className={`font-body-md text-body-md ${
                    isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                  }`}
                >
                  Ingeniero en Computación con Maestría en Administración (MBA). Conecto el diseño
                  técnico de alta escala con el retorno de inversión exigido por comités directivos
                  y C-level.
                </p>
              </div>

              {/* Comparative Bento */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
                {/* Traditional Pitfalls */}
                <div
                  className={`p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md ${
                    isAmethyst
                      ? 'bg-[#1f1435] border border-[#382256]'
                      : 'bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center gap-space-sm text-error">
                    <span className="material-symbols-outlined text-[24px]">cancel</span>
                    <span
                      className={`font-headline-sm text-headline-sm font-semibold ${
                        isAmethyst ? 'text-[#ffdad6]' : ''
                      }`}
                    >
                      La Fricción Convencional de TI
                    </span>
                  </div>
                  <ul
                    className={`flex flex-col gap-space-sm font-body-sm text-body-sm ${
                      isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                    }`}
                  >
                    <li className="flex items-start gap-space-xs">
                      <span className="material-symbols-outlined text-outline text-[18px] shrink-0 mt-0.5">
                        remove
                      </span>
                      <span>
                        Iniciativas de digitalización que se extienden sin métricas de retorno
                        claras ni amortización planificada.
                      </span>
                    </li>
                    <li className="flex items-start gap-space-xs">
                      <span className="material-symbols-outlined text-outline text-[18px] shrink-0 mt-0.5">
                        remove
                      </span>
                      <span>
                        Silos técnicos donde ingeniería toma decisiones aisladas de las metas
                        comerciales de los departamentos operativos.
                      </span>
                    </li>
                    <li className="flex items-start gap-space-xs">
                      <span className="material-symbols-outlined text-outline text-[18px] shrink-0 mt-0.5">
                        remove
                      </span>
                      <span>
                        Costes de nube impredecibles que erosionan el margen bruto tras migraciones
                        no gobernadas (deuda cloud).
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Integrated Value Model */}
                <div
                  className={`p-space-lg rounded-xl flex flex-col gap-space-md ${
                    isAmethyst
                      ? 'bg-[#261942] border border-[#4c2d75] shadow-[0_4px_20px_rgba(26,14,46,0.6)]'
                      : 'bg-surface-container shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-space-sm text-primary">
                    <span className="material-symbols-outlined text-[24px]">verified</span>
                    <span
                      className={`font-headline-sm text-headline-sm font-semibold ${
                        isAmethyst ? 'text-[#ece4f7]' : ''
                      }`}
                    >
                      Mi Metodología Integrada
                    </span>
                  </div>
                  <ul
                    className={`flex flex-col gap-space-sm font-body-sm text-body-sm ${
                      isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'
                    }`}
                  >
                    <li className="flex items-start gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                        check_small
                      </span>
                      <span>
                        <strong className={isAmethyst ? 'text-white' : ''}>
                          Mapeo de Capacidad Empresarial:
                        </strong>{' '}
                        Cada microservicio o pipeline responde directamente a un OKR u objetivo de
                        rentabilidad.
                      </span>
                    </li>
                    <li className="flex items-start gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                        check_small
                      </span>
                      <span>
                        <strong className={isAmethyst ? 'text-white' : ''}>
                          FinOps &amp; Gobierno Estricto:
                        </strong>{' '}
                        Controles de consumo cloud preventivos con dashboards auditables de gasto en
                        tiempo real.
                      </span>
                    </li>
                    <li className="flex items-start gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                        check_small
                      </span>
                      <span>
                        <strong className={isAmethyst ? 'text-white' : ''}>
                          Transferencia Activa de Conocimiento:
                        </strong>{' '}
                        Coaching para líderes internos asegurando continuidad sin dependencia
                        externa perpetua.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Core Strategic Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-md">
                <div
                  className={`p-space-md rounded-xl flex flex-col gap-space-sm transition-colors ${
                    isAmethyst
                      ? 'bg-[#19102b] border border-[#382256] hover:border-[#4c2d75]'
                      : 'bg-surface-container-low'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-primary ${
                      isAmethyst
                        ? 'bg-[#281a42] border border-[#4c2d75] shadow-[0_0_12px_rgba(143,78,237,0.25)]'
                        : 'bg-surface-container-high'
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      ></path>
                    </svg>
                  </div>
                  <h3
                    className={`font-headline-sm text-headline-sm ${
                      isAmethyst ? 'font-semibold text-[#ece4f7]' : 'text-on-surface'
                    }`}
                  >
                    Alineación Estratégica
                  </h3>
                  <p
                    className={`font-body-sm text-body-sm ${
                      isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                    }`}
                  >
                    Ningún componente tecnológico se aprueba sin justificación comercial y
                    estimación formal de TCO (Total Cost of Ownership).
                  </p>
                </div>

                <div
                  className={`p-space-md rounded-xl flex flex-col gap-space-sm transition-colors ${
                    isAmethyst
                      ? 'bg-[#19102b] border border-[#382256] hover:border-[#4c2d75]'
                      : 'bg-surface-container-low'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-primary ${
                      isAmethyst
                        ? 'bg-[#281a42] border border-[#4c2d75] shadow-[0_0_12px_rgba(143,78,237,0.25)]'
                        : 'bg-surface-container-high'
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      ></path>
                    </svg>
                  </div>
                  <h3
                    className={`font-headline-sm text-headline-sm ${
                      isAmethyst ? 'font-semibold text-[#ece4f7]' : 'text-on-surface'
                    }`}
                  >
                    Gobernanza &amp; Seguridad
                  </h3>
                  <p
                    className={`font-body-sm text-body-sm ${
                      isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                    }`}
                  >
                    Cumplimiento regulatorio, auditorías SOC 2, ISO 27001 y políticas Zero Trust
                    embebidas de forma nativa en el ciclo de despliegue.
                  </p>
                </div>

                <div
                  className={`p-space-md rounded-xl flex flex-col gap-space-sm transition-colors ${
                    isAmethyst
                      ? 'bg-[#19102b] border border-[#382256] hover:border-[#4c2d75]'
                      : 'bg-surface-container-low'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-primary ${
                      isAmethyst
                        ? 'bg-[#281a42] border border-[#4c2d75] shadow-[0_0_12px_rgba(143,78,237,0.25)]'
                        : 'bg-surface-container-high'
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      ></path>
                    </svg>
                  </div>
                  <h3
                    className={`font-headline-sm text-headline-sm ${
                      isAmethyst ? 'font-semibold text-[#ece4f7]' : 'text-on-surface'
                    }`}
                  >
                    Cultura &amp; Adopción
                  </h3>
                  <p
                    className={`font-body-sm text-body-sm ${
                      isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                    }`}
                  >
                    La transformación digital es un cambio humano: diseño programas de habilitación
                    para que los equipos adopten las herramientas ágilmente.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: EXPERIENCIA PROFESIONAL */}
          <section id="experiencia" className="w-full py-space-xxl">
            <div className="max-w-[1320px] mx-auto px-gutter-mobile lg:px-gutter flex flex-col gap-space-xl">
              <div className="flex flex-col gap-space-xs max-w-2xl">
                <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
                  Historial de Liderazgo
                </span>
                <h2
                  className={`font-headline-lg ${
                    isAmethyst
                      ? 'text-2xl sm:text-3xl font-bold text-[#ece4f7]'
                      : 'text-headline-lg text-on-surface'
                  }`}
                >
                  Experiencia Profesional Ejecutiva
                </h2>
                <p
                  className={`font-body-md text-body-md ${
                    isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                  }`}
                >
                  Trayectoria comprobable liderando transformaciones corporativas complejas en
                  empresas multinacionales de tecnología y consultoría.
                </p>
              </div>

              <div
                className={`relative flex flex-col gap-space-lg pl-6 sm:pl-8 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 ${
                  isAmethyst ? 'before:bg-[#382256]' : 'before:bg-surface-container-high'
                }`}
              >
                {/* Experience Card 1 */}
                <div
                  className={`relative flex flex-col gap-space-sm p-space-lg rounded-xl shadow-sm ${
                    isAmethyst
                      ? 'bg-[#19102b] border border-[#382256] hover:border-[#4c2d75]'
                      : 'bg-surface-container-low'
                  }`}
                >
                  <div
                    className={`absolute -left-6 sm:-left-8 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-surface ${
                      isAmethyst ? 'shadow-[0_0_10px_rgba(192,132,252,0.8)]' : ''
                    }`}
                  ></div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                    <div>
                      <h3
                        className={`font-headline-sm text-headline-sm ${
                          isAmethyst ? 'font-semibold text-[#ece4f7]' : 'text-on-surface'
                        }`}
                      >
                        Lead Enterprise Architect &amp; Director de TI
                      </h3>
                      <span className="font-label-md text-label-md text-primary font-medium">
                        NexaCorp Global • Gestión Corporativa
                      </span>
                    </div>
                    <span
                      className={`px-space-sm py-1 rounded font-label-sm text-label-sm self-start sm:self-auto ${
                        isAmethyst
                          ? 'bg-[#281a42] border border-[#4c2d75] text-[#d9b9ff] font-medium'
                          : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      2021 — Presente
                    </span>
                  </div>
                  <p
                    className={`font-body-md text-body-md ${
                      isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                    }`}
                  >
                    Liderazgo directo de 24 ingenieros y arquitectos en 3 países. Definición del
                    roadmap estratégico de modernización multicloud sobre AWS y Kubernetes con
                    orquestación continua.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
                    <div
                      className={`flex items-center gap-space-xs font-body-sm text-body-sm ${
                        isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        trending_down
                      </span>
                      <span>
                        Reducción de costos de infraestructura en un{' '}
                        <strong className={isAmethyst ? 'text-white' : ''}>32%</strong> mediante
                        FinOps
                      </span>
                    </div>
                    <div
                      className={`flex items-center gap-space-xs font-body-sm text-body-sm ${
                        isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        speed
                      </span>
                      <span>
                        Tiempos de release reducidos de{' '}
                        <strong className={isAmethyst ? 'text-white' : ''}>
                          4 semanas a 18 minutos
                        </strong>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-space-xs pt-space-xs">
                    {['AWS', 'Kubernetes', 'Terraform', 'FinOps', 'Zero Trust'].map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 rounded font-label-sm text-label-sm ${
                          isAmethyst
                            ? 'bg-[#201437] border border-[#382256] text-[#d9b9ff]'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience Card 2 */}
                <div
                  className={`relative flex flex-col gap-space-sm p-space-lg rounded-xl shadow-sm ${
                    isAmethyst
                      ? 'bg-[#19102b] border border-[#382256] hover:border-[#4c2d75]'
                      : 'bg-surface-container-low'
                  }`}
                >
                  <div
                    className={`absolute -left-6 sm:-left-8 top-6 -translate-x-1/2 w-4 h-4 rounded-full ring-4 ring-surface ${
                      isAmethyst
                        ? 'bg-[#a855f7] shadow-[0_0_10px_rgba(168,85,247,0.7)]'
                        : 'bg-secondary'
                    }`}
                  ></div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                    <div>
                      <h3
                        className={`font-headline-sm text-headline-sm ${
                          isAmethyst ? 'font-semibold text-[#ece4f7]' : 'text-on-surface'
                        }`}
                      >
                        Senior IT Business Consultant
                      </h3>
                      <span className="font-label-md text-label-md text-primary font-medium">
                        McKinsey &amp; Company / Alianza Digital • Práctica Financiera
                      </span>
                    </div>
                    <span
                      className={`px-space-sm py-1 rounded font-label-sm text-label-sm self-start sm:self-auto ${
                        isAmethyst
                          ? 'bg-[#281a42] border border-[#4c2d75] text-[#d9b9ff] font-medium'
                          : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      2018 — 2021
                    </span>
                  </div>
                  <p
                    className={`font-body-md text-body-md ${
                      isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                    }`}
                  >
                    Diagnóstico, reingeniería de procesos e implementación de arquitecturas para
                    instituciones financieras y grandes almacenes minoristas en México y Colombia.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
                    <div
                      className={`flex items-center gap-space-xs font-body-sm text-body-sm ${
                        isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        verified_user
                      </span>
                      <span>
                        Arquitectura bancaria transaccional con SLA{' '}
                        <strong className={isAmethyst ? 'text-white' : ''}>99.99%</strong>
                      </span>
                    </div>
                    <div
                      className={`flex items-center gap-space-xs font-body-sm text-body-sm ${
                        isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        savings
                      </span>
                      <span>
                        Retorno de inversión (ROI) consolidado en{' '}
                        <strong className={isAmethyst ? 'text-white' : ''}>11 meses</strong>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-space-xs pt-space-xs">
                    {['Core Banking', 'Event-Driven Architecture', 'TOGAF', 'Kafka'].map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 rounded font-label-sm text-label-sm ${
                          isAmethyst
                            ? 'bg-[#201437] border border-[#382256] text-[#d9b9ff]'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience Card 3 */}
                <div
                  className={`relative flex flex-col gap-space-sm p-space-lg rounded-xl shadow-sm ${
                    isAmethyst
                      ? 'bg-[#19102b] border border-[#382256] hover:border-[#4c2d75]'
                      : 'bg-surface-container-low'
                  }`}
                >
                  <div
                    className={`absolute -left-6 sm:-left-8 top-6 -translate-x-1/2 w-4 h-4 rounded-full ring-4 ring-surface ${
                      isAmethyst
                        ? 'bg-[#8f4eed] shadow-[0_0_10px_rgba(143,78,237,0.7)]'
                        : 'bg-secondary-container'
                    }`}
                  ></div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                    <div>
                      <h3
                        className={`font-headline-sm text-headline-sm ${
                          isAmethyst ? 'font-semibold text-[#ece4f7]' : 'text-on-surface'
                        }`}
                      >
                        Arquitecto de Soluciones Cloud &amp; ERP
                      </h3>
                      <span className="font-label-md text-label-md text-primary font-medium">
                        SoftTech Enterprise • Integración de Sistemas
                      </span>
                    </div>
                    <span
                      className={`px-space-sm py-1 rounded font-label-sm text-label-sm self-start sm:self-auto ${
                        isAmethyst
                          ? 'bg-[#281a42] border border-[#4c2d75] text-[#d9b9ff] font-medium'
                          : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      2015 — 2018
                    </span>
                  </div>
                  <p
                    className={`font-body-md text-body-md ${
                      isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                    }`}
                  >
                    Migración de sistemas legados on-premise hacia SAP S/4HANA sobre infraestructura
                    Azure e integración de pasarelas de pago y middleware API unificado.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
                    <div
                      className={`flex items-center gap-space-xs font-body-sm text-body-sm ${
                        isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        sync_alt
                      </span>
                      <span>Integración de 42 fuentes de datos legacy sin disrupción</span>
                    </div>
                    <div
                      className={`flex items-center gap-space-xs font-body-sm text-body-sm ${
                        isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        timer
                      </span>
                      <span>
                        Cierre contable mensual acelerado de 8 días a{' '}
                        <strong className={isAmethyst ? 'text-white' : 'font-normal'}>
                          24 horas
                        </strong>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-space-xs pt-space-xs">
                    {['SAP S/4HANA', 'Azure', 'REST APIs', 'Microservicios'].map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 rounded font-label-sm text-label-sm ${
                          isAmethyst
                            ? 'bg-[#201437] border border-[#382256] text-[#d9b9ff]'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: PROYECTOS DESTACADOS / PORTAFOLIO */}
          <section
            id="proyectos"
            className={`w-full py-space-xxl ${
              isAmethyst
                ? 'bg-[#180f28] border-y border-[#382256]'
                : 'bg-surface-container-lowest'
            }`}
          >
            <div className="max-w-[1320px] mx-auto px-gutter-mobile lg:px-gutter flex flex-col gap-space-xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                <div className="flex flex-col gap-space-xs max-w-xl">
                  <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
                    Casos de Estudio
                  </span>
                  <h2
                    className={`font-headline-lg ${
                      isAmethyst
                        ? 'text-2xl sm:text-3xl font-bold text-[#ece4f7]'
                        : 'text-headline-lg text-on-surface'
                    }`}
                  >
                    Soluciones de Arquitectura &amp; Resultados Medibles
                  </h2>
                  <p
                    className={`font-body-md text-body-md ${
                      isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                    }`}
                  >
                    Transformaciones completadas con resultados certificados de performance y
                    optimización presupuestaria.
                  </p>
                </div>

                {/* Filter Controls */}
                <div
                  id="project-filters"
                  className={`flex flex-wrap items-center gap-1.5 rounded-xl ${
                    isAmethyst
                      ? 'p-1.5 bg-[#120b1f] border border-[#382256]'
                      : 'p-1 bg-surface-container-low'
                  }`}
                >
                  {(
                    [
                      { key: 'all', label: 'Todos' },
                      { key: 'cloud', label: 'Arquitectura Cloud' },
                      { key: 'digital', label: 'Transformación Digital' },
                      { key: 'erp', label: 'ERP & Analytics' },
                    ] as { key: ProjectCategory; label: string }[]
                  ).map((btn) => {
                    const active = projectFilter === btn.key;
                    return (
                      <button
                        key={btn.key}
                        type="button"
                        onClick={() => setProjectFilter(btn.key)}
                        className={`filter-btn px-space-md py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer whitespace-nowrap ${
                          active
                            ? isAmethyst
                              ? 'active bg-gradient-to-r from-primary-container to-[#a855f7] text-white font-semibold shadow-[0_2px_12px_rgba(143,78,237,0.4)]'
                              : 'active bg-primary text-on-primary font-semibold'
                            : isAmethyst
                            ? 'text-[#b8a7ce] hover:text-[#ece4f7] hover:bg-[#201437] font-medium'
                            : 'text-on-surface-variant hover:text-on-surface font-medium'
                        }`}
                      >
                        {btn.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Project Cards Grid */}
              <div id="projects-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedProject(project);
                      }
                    }}
                    className={`project-card flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isAmethyst
                        ? 'bg-[#19102b] border border-[#382256] shadow-[0_4px_20px_rgba(10,5,18,0.5)] hover:shadow-[0_8px_30px_rgba(143,78,237,0.25)] hover:border-[#4c2d75]'
                        : 'bg-surface-container-low shadow-sm hover:shadow-2xl'
                    }`}
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-surface-container-high">
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <span
                        className={`absolute top-3 left-3 px-space-sm py-1 rounded backdrop-blur-md font-label-sm text-label-sm text-primary font-semibold ${
                          isAmethyst
                            ? 'bg-[#120b1fef] border border-[#4c2d75] shadow-sm'
                            : 'bg-surface/90'
                        }`}
                      >
                        {project.badge}
                      </span>
                    </div>

                    <div className="p-space-lg flex flex-col gap-space-md flex-1">
                      <h3
                        className={`font-headline-sm text-headline-sm ${
                          isAmethyst ? 'font-semibold text-[#ece4f7]' : 'text-on-surface'
                        }`}
                      >
                        {project.title}
                      </h3>
                      <div
                        className={`flex flex-col gap-space-xs text-body-sm font-body-sm ${
                          isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                        }`}
                      >
                        <div>
                          <strong className={isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'}>
                            Desafío:
                          </strong>{' '}
                          {project.challenge}
                        </div>
                        <div>
                          <strong className={isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'}>
                            Solución:
                          </strong>{' '}
                          {project.solution}
                        </div>
                      </div>

                      <div
                        className={`p-space-sm rounded-lg flex items-center justify-between mt-auto ${
                          isAmethyst
                            ? 'bg-[#201437] border border-[#382256]'
                            : 'bg-surface-container'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span
                            className={`font-label-sm text-label-sm ${
                              isAmethyst ? 'text-[#8e7ea3]' : 'text-on-surface-variant'
                            }`}
                          >
                            {project.metric1Label}
                          </span>
                          <span className="font-headline-sm text-headline-sm text-primary font-bold tabular-nums">
                            {project.metric1Value}
                          </span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span
                            className={`font-label-sm text-label-sm ${
                              isAmethyst ? 'text-[#8e7ea3]' : 'text-on-surface-variant'
                            }`}
                          >
                            {project.metric2Label}
                          </span>
                          <span
                            className={`font-headline-sm text-headline-sm font-bold tabular-nums ${
                              isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'
                            }`}
                          >
                            {project.metric2Value}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-space-xs">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-0.5 rounded font-label-sm text-label-sm ${
                              isAmethyst
                                ? 'bg-[#281a42] border border-[#4c2d75]/50 text-[#d9b9ff]'
                                : 'bg-surface-container text-on-surface-variant'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5: HABILIDADES TÉCNICAS & DE NEGOCIO */}
          <section id="habilidades" className="w-full py-space-xxl">
            <div className="max-w-[1320px] mx-auto px-gutter-mobile lg:px-gutter flex flex-col gap-space-xl">
              <div className="flex flex-col gap-space-xs max-w-2xl">
                <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
                  Competencias Clave
                </span>
                <h2
                  className={`font-headline-lg ${
                    isAmethyst
                      ? 'text-2xl sm:text-3xl font-bold text-[#ece4f7]'
                      : 'text-headline-lg text-on-surface'
                  }`}
                >
                  Matriz de Habilidades &amp; Certificaciones
                </h2>
                <p
                  className={`font-body-md text-body-md ${
                    isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                  }`}
                >
                  Balance simétrico entre habilidades cuantitativas de negocio y dominio de
                  ingeniería informática avanzada.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
                {/* Business & Strategy Pillar */}
                <div
                  className={`p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md ${
                    isAmethyst
                      ? 'bg-[#19102b] border border-[#382256]'
                      : 'bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center gap-space-sm text-primary">
                    <span className="material-symbols-outlined text-[24px]">account_balance</span>
                    <h3
                      className={`font-headline-sm text-headline-sm ${
                        isAmethyst ? 'font-semibold text-[#ece4f7]' : 'text-on-surface'
                      }`}
                    >
                      Capacidades Estratégicas y de Negocio
                    </h3>
                  </div>

                  <div className="flex flex-col gap-space-sm">
                    {[
                      {
                        name: 'Evaluación Financiera de TI (TCO, Capex vs Opex, ROI)',
                        level: 'Avanzado',
                        pct: 'w-[95%]',
                      },
                      {
                        name: 'Gobernanza de TI (COBIT, ITIL v4, TOGAF)',
                        level: 'Certificado',
                        pct: 'w-[90%]',
                      },
                      {
                        name: 'Metodologías Ágiles a Escala (SAFe, Scrum, Kanban)',
                        level: 'Líder',
                        pct: 'w-[88%]',
                      },
                      {
                        name: 'Negociación y Gestión de Proveedores Estratégicos',
                        level: 'Experto',
                        pct: 'w-[92%]',
                      },
                    ].map((skill) => (
                      <div key={skill.name} className="flex flex-col gap-1">
                        <div
                          className={`flex justify-between font-body-sm text-body-sm ${
                            isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'
                          }`}
                        >
                          <span>{skill.name}</span>
                          <span
                            className={`font-label-sm text-label-sm text-primary ${
                              isAmethyst ? 'font-semibold' : ''
                            }`}
                          >
                            {skill.level}
                          </span>
                        </div>
                        <div
                          className={`w-full h-1.5 rounded-full overflow-hidden ${
                            isAmethyst ? 'bg-[#281a42]' : 'bg-surface-container'
                          }`}
                        >
                          <div
                            className={`h-full rounded-full ${skill.pct} ${
                              isAmethyst
                                ? 'bg-gradient-to-r from-primary-container to-primary'
                                : 'bg-primary'
                            }`}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech & Architecture Pillar */}
                <div
                  className={`p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md ${
                    isAmethyst
                      ? 'bg-[#19102b] border border-[#382256]'
                      : 'bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center gap-space-sm text-primary">
                    <span className="material-symbols-outlined text-[24px]">terminal</span>
                    <h3
                      className={`font-headline-sm text-headline-sm ${
                        isAmethyst ? 'font-semibold text-[#ece4f7]' : 'text-on-surface'
                      }`}
                    >
                      Competencias Tecnológicas &amp; Arquitectura
                    </h3>
                  </div>

                  <div className="flex flex-col gap-space-sm">
                    {[
                      {
                        name: 'Nube Pública (AWS & Azure Solutions Architecture)',
                        level: 'Certificado Pro',
                        pct: 'w-[96%]',
                      },
                      {
                        name: 'Contenedores & Orquestación (Docker, Kubernetes)',
                        level: 'Avanzado',
                        pct: 'w-[90%]',
                      },
                      {
                        name: 'Arquitecturas Conducidas por Eventos & APIs (Kafka, REST, gRPC)',
                        level: 'Especialista',
                        pct: 'w-[92%]',
                      },
                      {
                        name: 'Bases de Datos & Warehousing (Snowflake, Postgres, DynamoDB)',
                        level: 'Experto',
                        pct: 'w-[88%]',
                      },
                    ].map((skill) => (
                      <div key={skill.name} className="flex flex-col gap-1">
                        <div
                          className={`flex justify-between font-body-sm text-body-sm ${
                            isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'
                          }`}
                        >
                          <span>{skill.name}</span>
                          <span
                            className={`font-label-sm text-label-sm text-primary ${
                              isAmethyst ? 'font-semibold' : ''
                            }`}
                          >
                            {skill.level}
                          </span>
                        </div>
                        <div
                          className={`w-full h-1.5 rounded-full overflow-hidden ${
                            isAmethyst ? 'bg-[#281a42]' : 'bg-surface-container'
                          }`}
                        >
                          <div
                            className={`h-full rounded-full ${skill.pct} ${
                              isAmethyst
                                ? 'bg-gradient-to-r from-primary-container to-primary'
                                : 'bg-primary'
                            }`}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified Certifications Badges */}
              <div
                className={`p-space-lg rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md ${
                  isAmethyst
                    ? 'bg-[#201437] border border-[#4c2d75]'
                    : 'bg-surface-container-high'
                }`}
              >
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[28px]">
                    military_tech
                  </span>
                  <div className="flex flex-col">
                    <span
                      className={`font-headline-sm text-headline-sm ${
                        isAmethyst ? 'font-semibold text-[#ece4f7]' : 'text-on-surface'
                      }`}
                    >
                      Acreditaciones Globales Verificadas
                    </span>
                    <span
                      className={`font-body-sm text-body-sm ${
                        isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                      }`}
                    >
                      Estándares internacionales de arquitectura y gobernanza
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-space-xs">
                  {[
                    'AWS Solutions Architect Pro',
                    'TOGAF 9.2 Certified',
                    'PMP® Project Management',
                    'Certified Scrum Master (CSM)',
                  ].map((cert) => (
                    <span
                      key={cert}
                      className={`px-space-sm py-1.5 rounded-lg font-label-md text-label-md text-primary font-medium ${
                        isAmethyst
                          ? 'bg-[#281a42] border border-[#4c2d75]'
                          : 'bg-surface-container'
                      }`}
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6: CONTACTO & AGENDAMIENTO */}
          <section
            id="contacto"
            className={`w-full py-space-xxl ${
              isAmethyst
                ? 'bg-[#180f28] border-t border-[#382256]'
                : 'bg-surface-container-lowest'
            }`}
          >
            <div className="max-w-[1320px] mx-auto px-gutter-mobile lg:px-gutter flex flex-col gap-space-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
                {/* Left Column: Direct Info & Copy Affordance */}
                <div className="lg:col-span-5 flex flex-col gap-space-lg">
                  <div className="flex flex-col gap-space-xs">
                    <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
                      Iniciemos Conversación
                    </span>
                    <h2
                      className={`font-headline-lg ${
                        isAmethyst
                          ? 'text-2xl sm:text-3xl font-bold text-[#ece4f7]'
                          : 'text-headline-lg text-on-surface'
                      }`}
                    >
                      Transforme la Eficiencia de sus Sistemas
                    </h2>
                    <p
                      className={`font-body-md text-body-md ${
                        isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                      }`}
                    >
                      Agenda una sesión inicial de diagnóstico sin compromiso técnico o envíame los
                      requerimientos preliminares de tu proyecto.
                    </p>
                  </div>

                  <div className="flex flex-col gap-space-sm">
                    {/* Email Item with Copy to Clipboard Button */}
                    <div
                      className={`p-space-md rounded-xl shadow-sm flex items-center justify-between gap-space-sm transition-colors ${
                        isAmethyst
                          ? 'bg-[#19102b] border border-[#382256] hover:border-[#4c2d75]'
                          : 'bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-center gap-space-sm min-w-0">
                        <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                          mail
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span
                            className={`font-label-sm text-label-sm uppercase ${
                              isAmethyst ? 'text-[#8e7ea3]' : 'text-on-surface-variant'
                            }`}
                          >
                            Correo Electrónico
                          </span>
                          <span
                            id="consultant-email"
                            className={`font-body-md text-body-md font-semibold truncate ${
                              isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'
                            }`}
                          >
                            alexandre.morales@vanguard-it.io
                          </span>
                        </div>
                      </div>
                      <button
                        id="btn-copy-email"
                        type="button"
                        onClick={handleCopyEmail}
                        title="Copiar al portapapeles"
                        className={`p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0 cursor-pointer ${
                          isAmethyst
                            ? 'bg-[#281a42] border border-[#4c2d75] text-[#b8a7ce] hover:text-primary hover:border-primary'
                            : 'bg-surface-container text-on-surface hover:text-primary'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">content_copy</span>
                      </button>
                    </div>

                    {/* Phone Direct */}
                    <div
                      className={`p-space-md rounded-xl shadow-sm flex items-center gap-space-sm transition-colors ${
                        isAmethyst
                          ? 'bg-[#19102b] border border-[#382256] hover:border-[#4c2d75]'
                          : 'bg-surface-container-low'
                      }`}
                    >
                      <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                        call
                      </span>
                      <div className="flex flex-col">
                        <span
                          className={`font-label-sm text-label-sm uppercase ${
                            isAmethyst ? 'text-[#8e7ea3]' : 'text-on-surface-variant'
                          }`}
                        >
                          Teléfono Corporativo
                        </span>
                        <span
                          className={`font-body-md text-body-md font-semibold tabular-nums ${
                            isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'
                          }`}
                        >
                          +52 55 4169 8200
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div
                      className={`p-space-md rounded-xl shadow-sm flex items-center gap-space-sm transition-colors ${
                        isAmethyst
                          ? 'bg-[#19102b] border border-[#382256] hover:border-[#4c2d75]'
                          : 'bg-surface-container-low'
                      }`}
                    >
                      <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                        location_on
                      </span>
                      <div className="flex flex-col">
                        <span
                          className={`font-label-sm text-label-sm uppercase ${
                            isAmethyst ? 'text-[#8e7ea3]' : 'text-on-surface-variant'
                          }`}
                        >
                          Ubicación &amp; Modalidad
                        </span>
                        <span
                          className={`font-body-md text-body-md font-semibold ${
                            isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'
                          }`}
                        >
                          Ciudad de México • Remoto Global / Híbrido
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Interactive Form */}
                <div
                  className={`lg:col-span-7 p-space-lg lg:p-space-xl rounded-xl ${
                    isAmethyst
                      ? 'bg-[#19102b] border border-[#382256] shadow-xl'
                      : 'bg-surface-container-low shadow-md'
                  }`}
                >
                  <form
                    id="contact-form"
                    noValidate
                    onSubmit={handleFormSubmit}
                    className="flex flex-col gap-space-md"
                  >
                    <div
                      className={`flex items-center justify-between border-b pb-space-sm ${
                        isAmethyst ? 'border-[#382256]' : 'border-surface-container-high'
                      }`}
                    >
                      <h3
                        className={`font-headline-sm text-headline-sm font-semibold ${
                          isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'
                        }`}
                      >
                        Solicitud de Consultoría
                      </h3>
                      <span
                        className={`font-label-sm text-label-sm ${
                          isAmethyst ? 'text-[#8e7ea3]' : 'text-on-surface-variant'
                        }`}
                      >
                        * Campos obligatorios
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                      {/* Name Input */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="contact-name"
                          className={`font-label-md text-label-md font-medium ${
                            isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'
                          }`}
                        >
                          Nombre Completo <span className="text-primary">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors((prev) => ({ ...prev, name: false }));
                          }}
                          placeholder="Ej. Carlos Mendoza"
                          className={`w-full px-space-md py-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                            isAmethyst
                              ? 'bg-[#201437] border border-[#382256] text-[#ece4f7] placeholder:text-[#8e7ea3] focus:border-transparent'
                              : 'bg-surface-container text-on-surface placeholder:text-outline'
                          }`}
                        />
                        {errors.name && (
                          <span
                            id="name-error"
                            className="text-error font-label-sm text-label-sm mt-0.5"
                          >
                            Por favor, escribe tu nombre.
                          </span>
                        )}
                      </div>

                      {/* Email Input */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="contact-email"
                          className={`font-label-md text-label-md font-medium ${
                            isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'
                          }`}
                        >
                          Correo Electrónico <span className="text-primary">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors((prev) => ({ ...prev, email: false }));
                          }}
                          placeholder="ejemplo@empresa.com"
                          className={`w-full px-space-md py-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                            isAmethyst
                              ? 'bg-[#201437] border border-[#382256] text-[#ece4f7] placeholder:text-[#8e7ea3] focus:border-transparent'
                              : 'bg-surface-container text-on-surface placeholder:text-outline'
                          }`}
                        />
                        {errors.email && (
                          <span
                            id="email-error"
                            className="text-error font-label-sm text-label-sm mt-0.5"
                          >
                            Ingresa un correo electrónico corporativo válido.
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Project Type Selector */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="project-type"
                        className={`font-label-md text-label-md font-medium ${
                          isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'
                        }`}
                      >
                        Tipo de Requerimiento <span className="text-primary">*</span>
                      </label>
                      <select
                        id="project-type"
                        required
                        value={projectType}
                        onChange={(e) => {
                          setProjectType(e.target.value);
                          if (errors.type) setErrors((prev) => ({ ...prev, type: false }));
                        }}
                        className={`w-full px-space-md py-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                          isAmethyst
                            ? 'bg-[#201437] border border-[#382256] text-[#ece4f7] focus:border-transparent'
                            : 'bg-surface-container text-on-surface'
                        }`}
                      >
                        <option
                          value=""
                          disabled
                          className={isAmethyst ? 'bg-[#19102b] text-[#8e7ea3]' : ''}
                        >
                          Selecciona una opción...
                        </option>
                        <option
                          value="arquitectura"
                          className={isAmethyst ? 'bg-[#19102b] text-[#ece4f7]' : ''}
                        >
                          Consultoría de Arquitectura Empresarial Cloud
                        </option>
                        <option
                          value="auditoria"
                          className={isAmethyst ? 'bg-[#19102b] text-[#ece4f7]' : ''}
                        >
                          Auditoría &amp; Diagnóstico de Deuda Técnica
                        </option>
                        <option
                          value="liderazgo"
                          className={isAmethyst ? 'bg-[#19102b] text-[#ece4f7]' : ''}
                        >
                          Liderazgo Fraccional CTO / Principal Advisor
                        </option>
                        <option
                          value="erp"
                          className={isAmethyst ? 'bg-[#19102b] text-[#ece4f7]' : ''}
                        >
                          Migración ERP o Modernización de Core Data
                        </option>
                        <option
                          value="otro"
                          className={isAmethyst ? 'bg-[#19102b] text-[#ece4f7]' : ''}
                        >
                          Otro Requerimiento Específico
                        </option>
                      </select>
                      {errors.type && (
                        <span
                          id="type-error"
                          className="text-error font-label-sm text-label-sm mt-0.5"
                        >
                          Selecciona un tipo de requerimiento.
                        </span>
                      )}
                    </div>

                    {/* Message Field */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-message"
                        className={`font-label-md text-label-md font-medium ${
                          isAmethyst ? 'text-[#ece4f7]' : 'text-on-surface'
                        }`}
                      >
                        Alcance o Preguntas Preliminares <span className="text-primary">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (errors.message) setErrors((prev) => ({ ...prev, message: false }));
                        }}
                        placeholder="Describe brevemente el estado actual de tu infraestructura, metas o plazos estimados..."
                        className={`w-full px-space-md py-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${
                          isAmethyst
                            ? 'bg-[#201437] border border-[#382256] text-[#ece4f7] placeholder:text-[#8e7ea3] focus:border-transparent'
                            : 'bg-surface-container text-on-surface placeholder:text-outline'
                        }`}
                      />
                      {errors.message && (
                        <span
                          id="message-error"
                          className="text-error font-label-sm text-label-sm mt-0.5"
                        >
                          Por favor, incluye una descripción inicial.
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      id="submit-btn"
                      type="submit"
                      disabled={submitState === 'loading'}
                      className={`w-full mt-space-xs py-3.5 px-space-lg rounded-xl text-white font-headline-sm text-body-md font-semibold tracking-wide transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-space-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer ${
                        submitState === 'success'
                          ? 'bg-primary-container shadow-lg'
                          : isAmethyst
                          ? 'bg-gradient-to-r from-primary-container via-[#9333ea] to-[#a855f7] shadow-[0_4px_20px_rgba(143,78,237,0.4)] hover:shadow-[0_6px_28px_rgba(143,78,237,0.6)]'
                          : 'bg-gradient-to-r from-inverse-primary to-primary-container shadow-lg hover:shadow-xl'
                      }`}
                    >
                      <span id="btn-text">
                        {submitState === 'loading'
                          ? 'Enviando requerimiento...'
                          : submitState === 'success'
                          ? '¡Solicitud Registrada con Éxito!'
                          : 'Enviar Solicitud de Consulta'}
                      </span>
                      <span id="btn-icon" className="material-symbols-outlined text-[20px]">
                        {submitState === 'loading'
                          ? 'hourglass_empty'
                          : submitState === 'success'
                          ? 'check_circle'
                          : 'arrow_forward'}
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* CASE STUDY ARCHITECTURE MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className={`max-w-2xl w-full rounded-2xl overflow-hidden border shadow-2xl transition-all ${
              isAmethyst
                ? 'bg-[#19102b] border-[#4c2d75] text-[#ece4f7]'
                : 'bg-surface-container-low border-outline-variant/50 text-on-surface'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-52 w-full overflow-hidden">
              <img
                src={selectedProject.image}
                alt={selectedProject.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                aria-label="Cerrar detalle del caso de estudio"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
              <div className="absolute bottom-4 left-6 right-6 flex flex-col gap-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
                  {selectedProject.badge}
                </span>
                <h3 className="font-headline-md text-headline-md text-white">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-space-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div className="p-space-sm rounded-lg bg-surface-container border border-outline-variant/30">
                  <span className="font-label-sm text-label-sm text-primary uppercase">
                    Desafío Crítico
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    {selectedProject.challenge}
                  </p>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container border border-outline-variant/30">
                  <span className="font-label-sm text-label-sm text-primary uppercase">
                    Arquitectura Implementada
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                  Topología de Nodos &amp; Flujo de Sistema
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.architectureNodes.map((node, idx) => (
                    <div
                      key={node}
                      className="px-3 py-2 rounded-lg bg-surface-container-high/70 border border-outline-variant/40 flex items-center gap-2 font-label-sm text-label-sm text-on-surface"
                    >
                      <span className="text-primary font-bold">0{idx + 1}.</span>
                      <span>{node}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-space-sm rounded-lg bg-surface-container border border-primary/30 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-primary uppercase">
                    Impacto en Balance General
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface mt-0.5">
                    {selectedProject.executiveOutcome}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-space-sm pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const title = selectedProject.title;
                    setSelectedProject(null);
                    setProjectType(
                      selectedProject.category === 'cloud'
                        ? 'arquitectura'
                        : selectedProject.category === 'erp'
                        ? 'erp'
                        : 'auditoria'
                    );
                    setMessage(
                      `Me interesa evaluar una arquitectura similar al caso "${title}" para nuestra organización.`
                    );
                    scrollToSection('contacto');
                  }}
                  className="px-space-md py-2.5 rounded-lg bg-primary text-on-primary font-headline-sm text-body-sm font-semibold hover:opacity-95 transition-opacity cursor-pointer"
                >
                  Solicitar Diagnóstico Similar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer
        className={`w-full border-t mt-auto ${
          isAmethyst
            ? 'bg-[#0e0719] border-[#382256]'
            : 'bg-surface-container-lowest border-[#2e1c4a]'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-gutter-mobile lg:px-gutter py-space-xl flex flex-col gap-space-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-space-lg items-start">
            <div className="flex flex-col gap-space-sm md:col-span-1">
              <div className="flex items-center gap-space-xs">
                <span
                  className={`font-headline-sm text-headline-sm ${
                    isAmethyst ? 'font-semibold text-[#ece4f7]' : 'text-on-surface'
                  }`}
                >
                  Executive Advisory
                </span>
              </div>
              <p
                className={`font-body-sm text-body-sm ${
                  isAmethyst ? 'text-[#b8a7ce]' : 'text-outline'
                }`}
              >
                Strategic alignment of high-load distributed architectures, cloud transformation,
                and executive IT governance.
              </p>
              <div className="flex items-center gap-space-xs pt-space-xs">
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-label-sm font-medium ${
                    isAmethyst
                      ? 'bg-[#201437] border border-[#4c2d75] text-[#d9b9ff]'
                      : 'bg-surface-container border border-outline-variant text-on-surface-variant'
                  }`}
                >
                  WCAG 2.1 AA Compliant
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-space-xs">
              <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold">
                Directorio
              </span>
              <a
                href="#inicio"
                onClick={(e) => scrollToSection('inicio', e)}
                className={`font-body-sm text-body-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                  isAmethyst
                    ? 'text-[#8e7ea3] hover:text-[#ece4f7]'
                    : 'text-outline hover:text-on-surface'
                }`}
              >
                Inicio
              </a>
              <a
                href="#sobre-mi"
                onClick={(e) => scrollToSection('sobre-mi', e)}
                className={`font-body-sm text-body-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                  isAmethyst
                    ? 'text-[#8e7ea3] hover:text-[#ece4f7]'
                    : 'text-outline hover:text-on-surface'
                }`}
              >
                Sobre Mí
              </a>
              <a
                href="#experiencia"
                onClick={(e) => scrollToSection('experiencia', e)}
                className={`font-body-sm text-body-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                  isAmethyst
                    ? 'text-[#8e7ea3] hover:text-[#ece4f7]'
                    : 'text-outline hover:text-on-surface'
                }`}
              >
                Experiencia Ejecutiva
              </a>
              <a
                href="#proyectos"
                onClick={(e) => scrollToSection('proyectos', e)}
                className={`font-body-sm text-body-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                  isAmethyst
                    ? 'text-[#8e7ea3] hover:text-[#ece4f7]'
                    : 'text-outline hover:text-on-surface'
                }`}
              >
                Casos de Estudio
              </a>
            </div>

            <div className="flex flex-col gap-space-xs">
              <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold">
                Especialidades
              </span>
              {[
                'Arquitectura Empresarial',
                'Gobierno & Estrategia TI',
                'Migración Cloud & FinOps',
                'Auditoría de Sistemas',
              ].map((spec) => (
                <a
                  key={spec}
                  href="#habilidades"
                  onClick={(e) => scrollToSection('habilidades', e)}
                  className={`font-body-sm text-body-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                    isAmethyst
                      ? 'text-[#8e7ea3] hover:text-[#ece4f7]'
                      : 'text-outline hover:text-on-surface'
                  }`}
                >
                  {spec}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-space-xs">
              <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold">
                Canales Directos
              </span>
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Abriendo perfil corporativo LinkedIn Enterprise...');
                  scrollToSection('contacto');
                }}
                className={`font-body-sm text-body-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                  isAmethyst
                    ? 'text-[#8e7ea3] hover:text-[#ece4f7]'
                    : 'text-outline hover:text-on-surface'
                }`}
              >
                LinkedIn Enterprise
              </a>
              <a
                href="#proyectos"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Explorando repositorios y arquitecturas de referencia...');
                  scrollToSection('proyectos');
                }}
                className={`font-body-sm text-body-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                  isAmethyst
                    ? 'text-[#8e7ea3] hover:text-[#ece4f7]'
                    : 'text-outline hover:text-on-surface'
                }`}
              >
                GitHub Repositories
              </a>
              <a
                href="#sobre-mi"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Cargando artículos ejecutivos en Substack Tech Briefs...');
                  scrollToSection('sobre-mi');
                }}
                className={`font-body-sm text-body-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                  isAmethyst
                    ? 'text-[#8e7ea3] hover:text-[#ece4f7]'
                    : 'text-outline hover:text-on-surface'
                }`}
              >
                Substack Tech Briefs
              </a>
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  handleCopyEmail();
                  scrollToSection('contacto');
                }}
                className={`font-body-sm text-body-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                  isAmethyst
                    ? 'text-[#8e7ea3] hover:text-[#ece4f7]'
                    : 'text-outline hover:text-on-surface'
                }`}
              >
                consulting@enterprise-arch.io
              </a>
            </div>
          </div>

          <div
            className={`pt-space-md border-t flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm ${
              isAmethyst
                ? 'border-[#382256] text-[#8e7ea3]'
                : 'border-outline-variant/30 text-outline'
            }`}
          >
            <div>© 2025 Principal Enterprise Architect. Todos los derechos reservados.</div>
            <div className="flex items-center gap-space-md">
              <span
                className={`font-label-sm ${
                  isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                }`}
              >
                High Precision Architecture
              </span>
              <span className={isAmethyst ? 'text-[#4c2d75]' : 'text-outline-variant'}>•</span>
              <span
                className={`font-label-sm ${
                  isAmethyst ? 'text-[#b8a7ce]' : 'text-on-surface-variant'
                }`}
              >
                Zero Trust Security
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
