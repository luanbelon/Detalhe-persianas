import { Award, Heart, Palette, Ruler, Settings, TrendingUp, Users } from 'lucide-react';

const ICON_MAP = {
  ruler: Ruler,
  settings: Settings,
  palette: Palette,
  award: Award,
  users: Users,
  heart: Heart,
  trendingUp: TrendingUp,
};

export const SERVICE_ICON_OPTIONS = [
  { value: 'ruler', label: 'Régua' },
  { value: 'settings', label: 'Engrenagem' },
  { value: 'palette', label: 'Paleta' },
  { value: 'award', label: 'Prêmio' },
  { value: 'users', label: 'Pessoas' },
  { value: 'heart', label: 'Coração' },
  { value: 'trendingUp', label: 'Crescimento' },
];

export function renderServiceIcon(name, className = 'w-10 h-10 text-primary mb-4') {
  const Icon = ICON_MAP[name] || Ruler;
  return <Icon className={className} />;
}

export function renderStatIcon(name, className = 'w-8 h-8 text-accent') {
  const Icon = ICON_MAP[name] || Award;
  return <Icon className={className} />;
}
