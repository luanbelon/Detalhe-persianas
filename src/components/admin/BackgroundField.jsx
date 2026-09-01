import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BG_TYPES = [
  { value: 'class', label: 'Classe padrão (tema)' },
  { value: 'color', label: 'Cor sólida' },
  { value: 'gradient', label: 'Gradiente' },
  { value: 'image', label: 'Imagem de fundo' },
];

const CLASS_OPTIONS = [
  { value: 'bg-background', label: 'Fundo padrão' },
  { value: 'bg-muted', label: 'Fundo suave' },
  { value: 'bg-primary', label: 'Azul primário' },
  { value: 'bg-secondary', label: 'Secundário' },
];

export default function BackgroundField({ label, value, onChange }) {
  const bg = value || { type: 'class', value: 'bg-muted' };

  const update = (patch) => onChange({ ...bg, ...patch });

  return (
    <div className="space-y-3 rounded-lg border p-4 bg-muted/20">
      <Label>{label}</Label>
      <Select value={bg.type} onValueChange={(type) => update({ type })}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {BG_TYPES.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {bg.type === 'class' && (
        <Select value={bg.value || 'bg-muted'} onValueChange={(v) => update({ value: v })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CLASS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {bg.type === 'color' && (
        <div className="flex gap-2">
          <Input type="color" value={bg.value || '#f4f4f5'} onChange={(e) => update({ value: e.target.value })} className="w-16 p-1" />
          <Input value={bg.value || ''} onChange={(e) => update({ value: e.target.value })} placeholder="#f4f4f5" />
        </div>
      )}

      {bg.type === 'gradient' && (
        <div className="grid sm:grid-cols-2 gap-2">
          <Input value={bg.from || ''} onChange={(e) => update({ from: e.target.value })} placeholder="Cor inicial (#000C66)" />
          <Input value={bg.to || ''} onChange={(e) => update({ to: e.target.value })} placeholder="Cor final (#3b82f6)" />
        </div>
      )}

      {bg.type === 'image' && (
        <Input
          value={bg.value || ''}
          onChange={(e) => update({ value: e.target.value })}
          placeholder="URL da imagem de fundo"
        />
      )}
    </div>
  );
}
