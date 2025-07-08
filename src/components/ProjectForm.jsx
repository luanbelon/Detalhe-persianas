
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const ProjectForm = ({ onSubmit, initialData = null, onCancel = null }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    color: '#4f46e5'
  });
  
  // Preencher o formulário com dados iniciais, se fornecidos
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData
      });
    }
  }, [initialData]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name) {
      toast({
        title: "Erro de validação",
        description: "Por favor, informe o nome do projeto.",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(formData);
    
    // Limpar formulário se não for edição
    if (!initialData) {
      setFormData({
        name: '',
        color: '#4f46e5'
      });
    }
    
    toast({
      title: initialData ? "Projeto atualizado" : "Projeto adicionado",
      description: initialData 
        ? "O projeto foi atualizado com sucesso." 
        : "Um novo projeto foi adicionado.",
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
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          Nome do Projeto
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ex: Desenvolvimento Web"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="color">Cor</Label>
        <div className="flex gap-2 items-center">
          <Input
            id="color"
            name="color"
            type="color"
            value={formData.color}
            onChange={handleChange}
            className="w-12 h-10 p-1"
          />
          <div 
            className="h-10 flex-1 rounded-md"
            style={{ backgroundColor: formData.color }}
          />
        </div>
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

export default ProjectForm;
