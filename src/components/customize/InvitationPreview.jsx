import React from 'react';
import { MapPin } from 'lucide-react';

const InvitationPreview = ({ previewData, template }) => {
  const pageStyle = {
    backgroundColor: previewData.secondaryColor,
    color: previewData.primaryColor,
    fontFamily: `'${previewData.fontFamily}', sans-serif`,
    backgroundImage: previewData.backgroundImage ? `url(${previewData.backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const contentWrapperStyle = previewData.backgroundImage 
    ? { backgroundColor: 'rgba(var(--card-rgb, 255, 255, 255), 0.8)', backdropFilter: 'blur(4px)' } 
    : {};
  
  const dynamicHeaderFont = template.fonts?.[0] || previewData.fontFamily;

  return (
    <div 
      className="p-4 md:p-8 min-h-full flex flex-col items-center justify-center text-center"
      style={pageStyle}
    >
      <div className="p-6 rounded-lg w-full max-w-md" style={contentWrapperStyle}>
        <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: `'${dynamicHeaderFont}', sans-serif` }}>
          {previewData.eventName || "Nome do Evento"}
        </h2>
        {previewData.hostNames && <p className="text-xl md:text-2xl mb-4 md:mb-6" style={{ fontFamily: `'${dynamicHeaderFont}', sans-serif` }}>{previewData.hostNames}</p>}
        
        <p className="text-lg md:text-xl mb-2">Convidamos você para celebrar conosco!</p>
        
        <div className="my-6 md:my-8">
          <p className="text-xl md:text-2xl font-semibold" style={{ color: previewData.primaryColor }}>
            {previewData.eventDate ? new Date(previewData.eventDate + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Data do Evento"}
          </p>
          <p className="text-lg md:text-xl" style={{ color: previewData.primaryColor }}>
            às {previewData.eventTime || "00:00"}
          </p>
        </div>
        
        <p className="text-md md:text-lg mb-4">
          <MapPin className="inline-block mr-2 h-5 w-5" />
          {previewData.eventLocation || "Local do Evento"}
        </p>
        
        {previewData.rsvpInfo && <p className="text-sm md:text-md mt-4 md:mt-6 mb-4">{previewData.rsvpInfo}</p>}
        {previewData.additionalMessage && <p className="text-sm md:text-md mt-4 italic">{previewData.additionalMessage}</p>}
      </div>
    </div>
  );
};

export default InvitationPreview;