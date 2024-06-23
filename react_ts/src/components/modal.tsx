import React, { useState, useEffect } from 'react';
import {ModalProps} from '../types'

import './modal.css';
import { useChatContext } from '../contexts/chatContext';

const Modal: React.FC = () => {
  const { modalProps, setModalProps } = useChatContext();
  const { title, data, onSubmit, onClose } = modalProps

  const [uiVisible, setVisible] = useState<Boolean>(modalProps.visible);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    setVisible(modalProps.visible)
    // data를 formData 초기 값으로 설정
    const initialFormData: Record<string, string> = {};
    data?.forEach(field => {initialFormData[field.key] = field.value;});

    setFormData(initialFormData);
  }, [modalProps]);

  const handleChange = (key: string, value: string) => {
    setFormData(prevState => ({...prevState, [key]: value }));
  };

  const handleSubmit = async () => {
    if (onSubmit) {
      await onSubmit(formData);
    }
    setVisible(false);
  };

  const handleClose = async () => {
    if (onClose) {
      await onClose(formData);
    }
    setVisible(false);
  };

  return (
    !uiVisible
      ? <></>
      : <div className="modal-overlay">
          <div className="modal">
            <h2>{title}</h2>
            <form>
              <div className="form-container">
                {data?.map((field, index) => (
                  <div key={index} className="form-group">
                    <label>{field.label}</label>
                    {field.type === 'input' && (
                      <input
                        type="text"
                        value={formData[field.key]}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                      />
                    )}
                    {field.type === 'select' && field.options && (
                      <select 
                        value={formData[field.key]}
                        onChange={(e) => handleChange(field.key, e.target.value)}>
                        {field.options.map((option, idx) => (
                          <option key={idx} value={option}>{option}</option>
                        ))}
                      </select>
                    )}
                    {field.type === 'textarea' && (
                      <textarea
                        value={formData[field.key]}
                        rows={ field.rows || 3}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </form>
            <div className="modal-actions">
              <button type="button" onClick={handleClose}>Cancel</button>
              <button type="button" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
  );
};

export default Modal;
