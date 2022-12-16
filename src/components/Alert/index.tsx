import React from 'react'
import './style.css';

type AlertProps = {
  text: string;
  onClose: () => void
}

const Alert = ({ text, onClose }: AlertProps) => {
  return (
    <div role="alert" className="alert">{text}<button onClick={onClose}>&times;</button></div>
  )
}

export default Alert;