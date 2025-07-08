import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CardTitle } from '@/components/ui/card';
import { Users, CalendarDays, MapPin } from 'lucide-react';

const EventDetailsForm = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      <CardTitle className="text-xl">Detalhes do Evento</CardTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="eventName" className="flex items-center"><Users className="mr-2 h-4 w-4 text-primary" />Nome do Evento</Label>
          <Input id="eventName" name="eventName" value={formData.eventName} onChange={handleChange} placeholder="Ex: Casamento de Ana e João" required />
        </div>
        <div>
          <Label htmlFor="hostNames" className="flex items-center"><Users className="mr-2 h-4 w-4 text-primary" />Nomes (Noivos, Aniversariante)</Label>
          <Input id="hostNames" name="hostNames" value={formData.hostNames} onChange={handleChange} placeholder="Ex: Ana & João" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="eventDate" className="flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-primary" />Data do Evento</Label>
          <Input id="eventDate" name="eventDate" type="date" value={formData.eventDate} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="eventTime" className="flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-primary" />Horário</Label>
          <Input id="eventTime" name="eventTime" type="time" value={formData.eventTime} onChange={handleChange} required />
        </div>
      </div>

      <div>
        <Label htmlFor="eventLocation" className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-primary" />Local do Evento</Label>
        <Input id="eventLocation" name="eventLocation" value={formData.eventLocation} onChange={handleChange} placeholder="Ex: Salão de Festas Elegance, Rua Flores, 123" required />
      </div>
      
      <div>
        <Label htmlFor="rsvpInfo" className="flex items-center"><Users className="mr-2 h-4 w-4 text-primary" />Informações de RSVP</Label>
        <Input id="rsvpInfo" name="rsvpInfo" value={formData.rsvpInfo} onChange={handleChange} placeholder="Ex: Confirme presença até 20/10 pelo tel (XX) XXXXX-XXXX" />
      </div>

      <div>
        <Label htmlFor="additionalMessage" className="flex items-center"><Users className="mr-2 h-4 w-4 text-primary" />Mensagem Adicional</Label>
        <Textarea id="additionalMessage" name="additionalMessage" value={formData.additionalMessage} onChange={handleChange} placeholder="Ex: Esperamos você para celebrar conosco!" />
      </div>
    </div>
  );
};

export default EventDetailsForm;