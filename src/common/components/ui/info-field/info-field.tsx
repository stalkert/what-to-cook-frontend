import React from 'react';
import './info-field.scss';

interface InfoFieldProps {
  title: string;
  text: string | number | undefined;
}

const InfoField: React.FC<InfoFieldProps> = ({ title, text }) => {
  return (
    <div className="info-field">
      <h3 className="info-title">{title}</h3>
      <p className="info-text">{text || 'N/A'}</p>
    </div>
  );
};

export default InfoField;
