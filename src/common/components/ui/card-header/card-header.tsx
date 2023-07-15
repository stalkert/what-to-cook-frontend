import React from 'react';
import './card-header.scss';
import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export enum ButtonType {
  Delete,
}
export interface UiButton {
  buttonTitle: string;
  callback: (params?: any) => any;
  danger?: boolean;
  buttonType?: ButtonType;
  isVisible?: boolean;
  disabled?: boolean;
}

interface CardTitleProps {
  title: string;
  isBackBtnVisible: boolean;
  backBtnLink: string;
  buttons?: UiButton[];
}

const CardHeader: React.FC<CardTitleProps> = ({ title, isBackBtnVisible = true, backBtnLink = '/', buttons }) => {
  return (
    <div className="card-header__wrapper">
      {isBackBtnVisible && (
        <Link to={backBtnLink} className="card-header__back-btn">
          <LeftOutlined />
        </Link>
      )}
      <h4 className="card-header__title">{title}</h4>

      <div className="card-header__buttons">
        {buttons?.map(({ danger, buttonTitle, callback, disabled }: UiButton) => {
          return (
            <Button key={buttonTitle} disabled={disabled} danger={danger} onClick={callback}>
              {buttonTitle}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CardHeader;
