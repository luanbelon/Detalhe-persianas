import { useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export default function ImageField({ label, value, onChange, alt, onAltChange }) {
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      alert('Imagem muito grande. Use arquivos de até 2MB ou cole uma URL.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3 rounded-lg border p-4 bg-muted/30">
      <Label>{label}</Label>
      {value && (
        <img src={value} alt="Pré-visualização" className="h-32 w-full object-cover rounded-md border" />
      )}
      <Input
        type="url"
        value={value?.startsWith('data:') ? '' : value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cole a URL da imagem"
      />
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
          Enviar imagem
        </Button>
        {value && (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange('')}>
            Remover
          </Button>
        )}
      </div>
      {onAltChange && (
        <Input
          value={alt || ''}
          onChange={(e) => onAltChange(e.target.value)}
          placeholder="Texto alternativo (acessibilidade)"
        />
      )}
    </div>
  );
}
