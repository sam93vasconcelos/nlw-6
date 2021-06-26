import { ButtonHTMLAttributes } from 'react';

import './styles.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

function Button({ isOutlined, ...props}: ButtonProps) {
  return (
    <button 
      className={
        `button ${isOutlined ? 'outlined' : ''}`
      } { ...props } />
  )
}

export default Button;