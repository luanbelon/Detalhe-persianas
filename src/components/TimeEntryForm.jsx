
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Tag, Briefcase, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const TimeEntryForm = ({ 
  projects, 
  onSubmit, 
  initialData = null, 
  onCancel = null 
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    duration: '',
    project: '',
    description: '',
    tags: []
  });
  
  const [tagInput, setTagInput] = useState('');
  
  // Preencher o formulário com dados iniciais, se fornecidos
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        tags: initialData.tags || []
      });
    }
  }, [initialData]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Calcular duração automaticamente quando horário de início e fim são preenchidos
    if ((name === 'startTime' || name === 'endTime') && formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}`);
      const end = new Date(`2000-01-01T${value === '' ? formData.endTime : (name === 'endTime' ? value : formData.endTime)}`);
      
      if (!isNaN(start) && !isNaN(end)) {
        const diffHours = (end - start) / (1000 * 60 * 60);
        if (diffHours >= 0) {
          setFormData(prev => ({ ...prev, duration: diffHours.toFixed(2) }));
        }
      }
    }
  };
  
  const handleProjectChange = (value) => {
    setFormData({ ...formData, project: value });
  };
  
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.date || !formData.project || !formData.description) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    if ((!formData.startTime || !formData.endTime) && !formData.duration) {
      toast({
        title: "Erro de validação",
        description: "Informe o horário de início e fim ou a duração.",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(formData);
    
    // Limpar formulário se não for edição
    if (!initialData) {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        startTime: '',
        endTime: '',
        duration: '',
        project: '',
        description: '',
        tags: []
      });
    }
    
    toast({
      title: initialData ? "Registro atualizado" : "Registro adicionado",
      description: initialData 
        ? "O registro de horas foi atualizado com sucesso." 
        : "Um novo registro de horas foi adicionado.",
    });
  };
  
  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-4 p-4 rounded-lg border bg-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Data
          </Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="project" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Projeto
          </Label>
          <Select 
            value={formData.project} 
            onValueChange={handleProjectChange}
          >
            <SelectTrigger id="project">
              <SelectValue placeholder="Selecione um projeto" />
            </SelectTrigger>
            <SelectContent>
              {projects.map(project => (
                <SelectItem key={project.id} value={project.name}>
                  <div className="flex items-center gap-2">
                    <span 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: project.color }}
                    />
                    {project.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Hora de início
          </Label>
          <Input
            id="startTime"
            name="startTime"
            type="time"
            value={formData.startTime}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="endTime" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Hora de término
          </Label>
          <Input
            id="endTime"
            name="endTime"
            type="time"
            value={formData.endTime}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duration" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Duração (horas)
          </Label>
          <Input
            id="duration"
            name="duration"
            type="number"
            step="0.01"
            min="0"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Ex: 2.5"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="O que você fez neste período?"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tags" className="flex items-center gap-2">
          <Tag className="h-4 w-4" />
          Tags
        </Label>
        <div className="flex gap-2">
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Adicionar tag"
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <Button 
            type="button" 
            variant="secondary"
            onClick={handleAddTag}
          >
            Adicionar
          </Button>
        </div>
        
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
              >
                {tag}
                <button
                  type="button"
                  className="text-primary hover:text-primary/80"
                  onClick={() => handleRemoveTag(tag)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancelar
          </Button>
        )}
        <Button type="submit" className="gap-2">
          <Save className="h-4 w-4" />
          {initialData ? 'Atualizar' : 'Salvar'}
        </Button>
      </div>
    </motion.form>
  );
};

export default TimeEntryForm;
