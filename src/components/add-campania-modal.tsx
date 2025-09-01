"use client"
//import { EstrategiaMarketingData } from '@/types/marketingWorkflowTypes';
import { ReactNode, ChangeEvent, FormEvent, useState, useEffect, useCallback } from "react";


interface AddCampaniaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (newInfoCampania:any) => void;
    title: string;
    message: ReactNode;
    idProyecto: string|null;
    target:any;
    duracion:number;
    fecha_inicio:any;
    objetivo:string;
}


const AddCampaniaModal: React.FC<AddCampaniaModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    idProyecto,
    target,
    fecha_inicio,
    duracion,
    objetivo
}) => {


const [newInfoCampania, setInfoCampania] = useState<{
    objetivo: string;
    target: any;
    fecha_inicio: any;
    duracion: number;
    id_proyecto: string;
  }>({
    objetivo: objetivo,
    target: target,
    fecha_inicio: fecha_inicio,
    duracion: 5,
    id_proyecto: idProyecto || "",
  });


 const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      setInfoCampania({ ...newInfoCampania, [e.target.name]: e.target.value });
      console.log(newInfoCampania)
    };
  



    if (!isOpen) return null;
    handleChange;
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
                <div className="mt-2 p-3 bg-gray-100 rounded">
                                <p>
                                  <strong>Objetivo</strong> (Los Ejemplos corresponden a los target definidos en la Estrategia General de Marketing. puedes escribir uno de estos objetivos o plantear uno totalmente nuevo y especifico para esta campaña.)
                                  <textarea name="objetivo" onChange={handleChange}   placeholder={objetivo}></textarea>
                                </p>
                                <br></br>
                                <p>
                                  <strong>Target Especifico de Campaña </strong>(Por defecto es el target predefinido de la estrategia general de marketing ya definida en el WorkFlow)
                                  <textarea name="target" onChange={handleChange} defaultValue={target}></textarea>
                                </p>
                                <br></br>
                                 <p>
                                  <strong>Fecha Inicio </strong>(Fecha Primera Publicacion)
                                  <input name="fecha_inicio" onChange={handleChange}   type="date" defaultValue={fecha_inicio}></input>
                                </p>
                                <br></br>
                                 <p>
                                  <strong>Diracion (Días)</strong>
                                  <input name="duracion" onChange={handleChange}  type="number" min="5" max="30" step="5" defaultValue={duracion}></input> 
                                </p>
                              </div>
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