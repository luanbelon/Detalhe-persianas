
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Tag, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const TimeEntryCard = ({ entry, projects, onEdit, onDelete }) => {
  // Encontrar a cor do projeto
  const projectColor = projects.find(p => p.name === entry.project)?.color || '#4f46e5';
  
  // Formatar duração para exibição
  const formatDuration = (hours) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h${m > 0 ? ` ${m}m` : ''}`;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      layout
      className="time-entry-card"
    >
      <Card className="overflow-hidden">
        <div 
          className="h-2" 
          style={{ backgroundColor: projectColor }}
        />
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{entry.description}</h3>
            <span 
              className="inline-block px-2 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: `${projectColor}20`, color: projectColor }}
            >
              {entry.project}
            </span>
          </div>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(entry.date).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {entry.startTime && entry.endTime 
                  ? `${entry.startTime} - ${entry.endTime}`
                  : formatDuration(parseFloat(entry.duration))
                }
                {entry.duration && ` (${formatDuration(parseFloat(entry.duration))})`}
              </span>
            </div>
            
            {entry.tags && entry.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <div className="flex flex-wrap gap-1">
                  {entry.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 justify-end gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 gap-1"
            onClick={() => onEdit(entry)}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:inline-block">Editar</span>
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 gap-1 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:inline-block">Excluir</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir este registro de horas? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => onDelete(entry.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TimeEntryCard;
