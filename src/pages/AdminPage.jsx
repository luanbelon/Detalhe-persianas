import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, LogOut, Plus, RotateCcw, Save, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSiteContent } from '@/context/SiteContentContext';
import { Button } from '@/components/ui/button';
import { AdminField, AdminSection } from '@/components/admin/AdminField';
import ImageField from '@/components/admin/ImageField';
import BackgroundField from '@/components/admin/BackgroundField';
import { SERVICE_ICON_OPTIONS } from '@/lib/serviceIcons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TABS = [
  { id: 'geral', label: 'Geral' },
  { id: 'header', label: 'Header & Footer' },
  { id: 'hero', label: 'Hero' },
  { id: 'services', label: 'Serviços' },
  { id: 'about', label: 'Sobre' },
  { id: 'gallery', label: 'Galeria' },
  { id: 'contact', label: 'Contato' },
];

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function AdminPage() {
  const { logout } = useAuth();
  const { content, setContent, resetContent, exportContent, importContent, syncing, syncError, saveNow } = useSiteContent();
  const [activeTab, setActiveTab] = useState('geral');
  const [saved, setSaved] = useState(false);

  const patch = (section, data) => {
    setContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const patchNested = (section, key, data) => {
    setContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: { ...prev[section][key], ...data } },
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleImport = () => {
    const json = prompt('Cole o JSON exportado:');
    if (!json) return;
    try {
      importContent(json);
      alert('Conteúdo importado com sucesso!');
    } catch {
      alert('JSON inválido.');
    }
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div>
            <h1 className="text-xl font-bold">Painel Admin</h1>
            <p className="text-sm text-muted-foreground">Edite textos, imagens, fundos e links do site</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {saved && <span className="text-sm text-green-600 self-center">Salvo ✓</span>}
            {syncing && <span className="text-sm text-muted-foreground self-center">Sincronizando...</span>}
            {syncError && <span className="text-sm text-destructive self-center">Erro: {syncError}</span>}
            <Button variant="outline" size="sm" onClick={() => saveNow().then(() => alert('Salvo no banco!')).catch(() => alert('Erro ao salvar.'))}>
              <Save className="h-4 w-4 mr-1" /> Salvar agora
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/" target="_blank">
                <ExternalLink className="h-4 w-4 mr-1" /> Ver site
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(exportContent())}>
              <Save className="h-4 w-4 mr-1" /> Exportar
            </Button>
            <Button variant="outline" size="sm" onClick={handleImport}>Importar</Button>
            <Button variant="outline" size="sm" onClick={() => { if (confirm('Restaurar conteúdo padrão?')) resetContent(); }}>
              <RotateCcw className="h-4 w-4 mr-1" /> Resetar
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-1" /> Sair
            </Button>
          </div>
        </div>
        <nav className="container mx-auto flex gap-1 overflow-x-auto px-4 pb-3">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6 max-w-4xl">
        {activeTab === 'geral' && (
          <>
            <AdminSection title="SEO & Meta" description="Título e descrição que aparecem no Google">
              <AdminField label="Título da página" value={content.meta.title} onChange={(v) => patch('meta', { title: v })} />
              <AdminField label="Descrição (meta)" type="textarea" value={content.meta.description} onChange={(v) => patch('meta', { description: v })} />
            </AdminSection>
            <AdminSection title="Contato global" description="Usado em várias seções do site">
              <AdminField label="Link WhatsApp" value={content.contact.whatsappUrl} onChange={(v) => patch('contact', { whatsappUrl: v })} />
              <AdminField label="Telefone exibido" value={content.contact.whatsappDisplay} onChange={(v) => patch('contact', { whatsappDisplay: v })} />
              <AdminField label="Link Instagram" value={content.contact.instagramUrl} onChange={(v) => patch('contact', { instagramUrl: v })} />
              <AdminField label="@ Instagram" value={content.contact.instagramHandle} onChange={(v) => patch('contact', { instagramHandle: v })} />
            </AdminSection>
            <AdminSection title="Marca">
              <AdminField label="Nome da empresa" value={content.brand.name} onChange={(v) => patch('brand', { name: v })} />
              <AdminField label="Descrição curta" type="textarea" value={content.brand.description} onChange={(v) => patch('brand', { description: v })} />
              <ImageField label="Logo" value={content.brand.logo} onChange={(v) => patch('brand', { logo: v })} />
            </AdminSection>
          </>
        )}

        {activeTab === 'header' && (
          <>
            <AdminSection title="Menu do Header">
              {content.header.navLinks.map((link, i) => (
                <div key={i} className="grid sm:grid-cols-2 gap-2 p-3 border rounded-lg">
                  <AdminField label="Texto" value={link.text} onChange={(v) => {
                    const navLinks = [...content.header.navLinks];
                    navLinks[i] = { ...navLinks[i], text: v };
                    patch('header', { navLinks });
                  }} />
                  <AdminField label="Link (#seção ou URL)" value={link.href} onChange={(v) => {
                    const navLinks = [...content.header.navLinks];
                    navLinks[i] = { ...navLinks[i], href: v };
                    patch('header', { navLinks });
                  }} />
                </div>
              ))}
              <AdminField label="Botão CTA - texto" value={content.header.ctaText} onChange={(v) => patch('header', { ctaText: v })} />
              <AdminField label="Botão CTA - link" value={content.header.ctaLink} onChange={(v) => patch('header', { ctaLink: v })} />
            </AdminSection>
            <AdminSection title="Rodapé">
              <BackgroundField label="Fundo do rodapé" value={content.footer.background} onChange={(v) => patch('footer', { background: v })} />
              <AdminField label="Título navegação" value={content.footer.navHeading} onChange={(v) => patch('footer', { navHeading: v })} />
              <AdminField label="Título contato" value={content.footer.contactHeading} onChange={(v) => patch('footer', { contactHeading: v })} />
              <AdminField label="Copyright" value={content.footer.copyright} onChange={(v) => patch('footer', { copyright: v })} />
              <AdminField label="Crédito desenvolvedor" value={content.footer.developerName} onChange={(v) => patch('footer', { developerName: v })} />
              <AdminField label="Link desenvolvedor" value={content.footer.developerUrl} onChange={(v) => patch('footer', { developerUrl: v })} />
              {content.footer.navLinks.map((link, i) => (
                <div key={i} className="grid sm:grid-cols-2 gap-2 p-3 border rounded-lg">
                  <AdminField label="Texto link" value={link.text} onChange={(v) => {
                    const navLinks = [...content.footer.navLinks];
                    navLinks[i] = { ...navLinks[i], text: v };
                    patch('footer', { navLinks });
                  }} />
                  <AdminField label="URL" value={link.href} onChange={(v) => {
                    const navLinks = [...content.footer.navLinks];
                    navLinks[i] = { ...navLinks[i], href: v };
                    patch('footer', { navLinks });
                  }} />
                </div>
              ))}
            </AdminSection>
          </>
        )}

        {activeTab === 'hero' && (
          <AdminSection title="Seção Hero">
            <AdminField label="Título (linha branca)" value={content.hero.headingLine1} onChange={(v) => patch('hero', { headingLine1: v })} />
            <AdminField label="Título (linha amarela)" value={content.hero.headingLine2} onChange={(v) => patch('hero', { headingLine2: v })} />
            <AdminField label="Subtítulo" type="textarea" value={content.hero.subtitle} onChange={(v) => patch('hero', { subtitle: v })} />
            <ImageField
              label="Imagem de fundo"
              value={content.hero.backgroundImage}
              onChange={(v) => patch('hero', { backgroundImage: v })}
              alt={content.hero.backgroundAlt}
              onAltChange={(v) => patch('hero', { backgroundAlt: v })}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <AdminField label="Cor do overlay" type="color" value={content.hero.overlayColor} onChange={(v) => patch('hero', { overlayColor: v })} />
              <AdminField label="Opacidade overlay (%)" type="number" value={String(content.hero.overlayOpacity)} onChange={(v) => patch('hero', { overlayOpacity: Number(v) })} />
            </div>
            <AdminField label="Botão primário - texto" value={content.hero.primaryButton.label} onChange={(v) => patchNested('hero', 'primaryButton', { label: v })} />
            <AdminField label="Botão primário - link" value={content.hero.primaryButton.link} onChange={(v) => patchNested('hero', 'primaryButton', { link: v })} />
            <AdminField label="Botão secundário - texto" value={content.hero.secondaryButton.label} onChange={(v) => patchNested('hero', 'secondaryButton', { label: v })} />
            <AdminField label="Botão secundário - link" value={content.hero.secondaryButton.link} onChange={(v) => patchNested('hero', 'secondaryButton', { link: v })} />
          </AdminSection>
        )}

        {activeTab === 'services' && (
          <>
            <AdminSection title="Cabeçalho Serviços">
              <BackgroundField label="Fundo da seção" value={content.services.background} onChange={(v) => patch('services', { background: v })} />
              <AdminField label="Título (parte 1)" value={content.services.headingPrefix} onChange={(v) => patch('services', { headingPrefix: v })} />
              <AdminField label="Título (destaque)" value={content.services.headingAccent} onChange={(v) => patch('services', { headingAccent: v })} />
              <AdminField label="Subtítulo" type="textarea" value={content.services.subtitle} onChange={(v) => patch('services', { subtitle: v })} />
            </AdminSection>
            {content.services.items.map((item, i) => (
              <AdminSection key={item.id} title={`Serviço ${i + 1}`}>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{item.title}</span>
                  <Button variant="ghost" size="sm" onClick={() => {
                    if (!confirm('Remover este serviço?')) return;
                    patch('services', { items: content.services.items.filter((s) => s.id !== item.id) });
                  }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ícone</label>
                  <Select value={item.icon} onValueChange={(v) => {
                    const items = [...content.services.items];
                    items[i] = { ...items[i], icon: v };
                    patch('services', { items });
                  }}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {SERVICE_ICON_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <AdminField label="Título" value={item.title} onChange={(v) => {
                  const items = [...content.services.items];
                  items[i] = { ...items[i], title: v };
                  patch('services', { items });
                }} />
                <AdminField label="Descrição" type="textarea" value={item.description} onChange={(v) => {
                  const items = [...content.services.items];
                  items[i] = { ...items[i], description: v };
                  patch('services', { items });
                }} />
                <AdminField
                  label="Itens (um por linha)"
                  type="textarea"
                  rows={5}
                  value={item.details.join('\n')}
                  onChange={(v) => {
                    const items = [...content.services.items];
                    items[i] = { ...items[i], details: v.split('\n').filter(Boolean) };
                    patch('services', { items });
                  }}
                />
              </AdminSection>
            ))}
            <Button variant="outline" onClick={() => patch('services', {
              items: [...content.services.items, { id: uid('svc'), icon: 'ruler', title: 'Novo serviço', description: '', details: [] }],
            })}>
              <Plus className="h-4 w-4 mr-1" /> Adicionar serviço
            </Button>
          </>
        )}

        {activeTab === 'about' && (
          <>
            <AdminSection title="Seção Sobre">
              <BackgroundField label="Fundo da seção" value={content.about.background} onChange={(v) => patch('about', { background: v })} />
              <AdminField label="Etiqueta" value={content.about.eyebrow} onChange={(v) => patch('about', { eyebrow: v })} />
              <AdminField label="Título (parte 1)" value={content.about.headingPrefix} onChange={(v) => patch('about', { headingPrefix: v })} />
              <AdminField label="Título (destaque)" value={content.about.headingAccent} onChange={(v) => patch('about', { headingAccent: v })} />
              <AdminField label="Parágrafo 1" type="textarea" value={content.about.paragraph1} onChange={(v) => patch('about', { paragraph1: v })} />
              <AdminField label="Parágrafo 2" type="textarea" value={content.about.paragraph2} onChange={(v) => patch('about', { paragraph2: v })} />
              <ImageField label="Imagem da seção" value={content.about.image} onChange={(v) => patch('about', { image: v })} alt={content.about.imageAlt} onAltChange={(v) => patch('about', { imageAlt: v })} />
            </AdminSection>
            {content.about.stats.map((stat, i) => (
              <AdminSection key={stat.id} title={`Estatística ${i + 1}`}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <AdminField label="Valor" value={stat.value} onChange={(v) => {
                    const stats = [...content.about.stats];
                    stats[i] = { ...stats[i], value: v };
                    patch('about', { stats });
                  }} />
                  <AdminField label="Rótulo" value={stat.label} onChange={(v) => {
                    const stats = [...content.about.stats];
                    stats[i] = { ...stats[i], label: v };
                    patch('about', { stats });
                  }} />
                </div>
              </AdminSection>
            ))}
          </>
        )}

        {activeTab === 'gallery' && (
          <>
            <AdminSection title="Cabeçalho Galeria">
              <BackgroundField label="Fundo da seção" value={content.gallery.background} onChange={(v) => patch('gallery', { background: v })} />
              <AdminField label="Título (parte 1)" value={content.gallery.headingPrefix} onChange={(v) => patch('gallery', { headingPrefix: v })} />
              <AdminField label="Título (destaque)" value={content.gallery.headingAccent} onChange={(v) => patch('gallery', { headingAccent: v })} />
              <AdminField label="Subtítulo" type="textarea" value={content.gallery.subtitle} onChange={(v) => patch('gallery', { subtitle: v })} />
              <AdminField label="Botão - texto" value={content.gallery.ctaText} onChange={(v) => patch('gallery', { ctaText: v })} />
              <AdminField label="Botão - link" value={content.gallery.ctaLink} onChange={(v) => patch('gallery', { ctaLink: v })} />
            </AdminSection>
            {content.gallery.items.map((item, i) => (
              <AdminSection key={item.id} title={`Foto ${i + 1}`}>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={() => {
                    if (!confirm('Remover esta foto?')) return;
                    patch('gallery', { items: content.gallery.items.filter((g) => g.id !== item.id) });
                  }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <ImageField label="Imagem" value={item.src} onChange={(v) => {
                  const items = [...content.gallery.items];
                  items[i] = { ...items[i], src: v };
                  patch('gallery', { items });
                }} alt={item.alt} onAltChange={(v) => {
                  const items = [...content.gallery.items];
                  items[i] = { ...items[i], alt: v };
                  patch('gallery', { items });
                }} />
              </AdminSection>
            ))}
            <Button variant="outline" onClick={() => patch('gallery', {
              items: [...content.gallery.items, { id: uid('gal'), src: '', alt: 'Nova foto do projeto' }],
            })}>
              <Plus className="h-4 w-4 mr-1" /> Adicionar foto
            </Button>
          </>
        )}

        {activeTab === 'contact' && (
          <AdminSection title="Seção Contato">
            <BackgroundField label="Fundo da seção" value={content.contact.background} onChange={(v) => patch('contact', { background: v })} />
            <AdminField label="Título" value={content.contact.heading} onChange={(v) => patch('contact', { heading: v })} />
            <AdminField label="Parágrafo" type="textarea" value={content.contact.paragraph} onChange={(v) => patch('contact', { paragraph: v })} />
            <AdminField label="Botão - texto" value={content.contact.ctaText} onChange={(v) => patch('contact', { ctaText: v })} />
            <AdminField label="Botão - link" value={content.contact.ctaLink} onChange={(v) => patch('contact', { ctaLink: v })} />
          </AdminSection>
        )}
      </main>
    </div>
  );
}
