import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CardTitle } from '@/components/ui/card';
import { Palette, Image as ImageIcon } from 'lucide-react';

const AppearanceForm = ({ formData, handleChange, handleSelectChange, handleImageUpload }) => {
  return (
    <div className="space-y-6">
      <CardTitle className="text-xl pt-4 border-t">Aparência</CardTitle>
      
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="primaryColor" className="flex items-center"><Palette className="mr-2 h-4 w-4 text-primary" />Cor Primária</Label>
          <Input id="primaryColor" name="primaryColor" type="color" value={formData.primaryColor} onChange={handleChange} className="h-10 p-1 w-full" />
        </div>
        <div>
          <Label htmlFor="secondaryColor" className="flex items-center"><Palette className="mr-2 h-4 w-4 text-primary" />Cor Secundária</Label>
          <Input id="secondaryColor" name="secondaryColor" type="color" value={formData.secondaryColor} onChange={handleChange} className="h-10 p-1 w-full" />
        </div>
      </div>
      
      <div>
        <Label htmlFor="fontFamily" className="flex items-center"><Palette className="mr-2 h-4 w-4 text-primary" />Fonte Principal</Label>
        <Select name="fontFamily" value={formData.fontFamily} onValueChange={(value) => handleSelectChange('fontFamily', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Escolha uma fonte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Roboto">Roboto (Moderna)</SelectItem>
            <SelectItem value="Montserrat">Montserrat (Elegante)</SelectItem>
            <SelectItem value="Lato">Lato (Simples)</SelectItem>
            <SelectItem value="Great Vibes">Great Vibes (Cursiva Elegante)</SelectItem>
            <SelectItem value="Playfair Display">Playfair Display (Serifada Clássica)</SelectItem>
            <SelectItem value="Pacifico">Pacifico (Cursiva Divertida)</SelectItem>
            <SelectItem value="Quicksand">Quicksand (Arredondada)</SelectItem>
            <SelectItem value="Orbitron">Orbitron (Futurista)</SelectItem>
            <SelectItem value="Press Start 2P">Press Start 2P (Pixel Art)</SelectItem>
            <SelectItem value="VT323">VT323 (Retrô Display)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="backgroundImage" className="flex items-center"><ImageIcon className="mr-2 h-4 w-4 text-primary" />Imagem de Fundo (Opcional)</Label>
        <Input id="backgroundImage" name="backgroundImage" type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
    </div>
  );
};

export default AppearanceForm;