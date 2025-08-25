import { EstrategiaMarketingData } from '@/types/marketingWorkflowTypes';
import { ReactNode } from 'react';

interface AddCampaniaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: ReactNode;
}

const AddCampaniaModal: React.FC<AddCampaniaModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message
}) => {
    if (!isOpen) return null;
    return(
        <div
            className='fixed inset-0 bg-gray-500 flex item-center justify-center z-50'
            onClick={onClose}
        >
            <div
                className='rounded- bg-white opacity-200 p-6 max-w-m w-m shadow-x1'
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className='text-lg font-medium mb-2'>{title}</h3>
                <div className='text-gray-600 mb-6'>{message}</div>
                <div className='flex justify-end space-x-3'>
                    <button 
                        onClick={onClose}
                        className="boton-cancelar"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="button-add-item"
                    >
                        Generar Campaña Completa con IA
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCampaniaModal;