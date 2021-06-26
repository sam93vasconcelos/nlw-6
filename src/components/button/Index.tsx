import { ButtonHTMLAttributes } from 'react';

import './styles.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Button(props: ButtonProps) {
  return (
    <button className="button" { ...props } />
  )
}

export default Button;