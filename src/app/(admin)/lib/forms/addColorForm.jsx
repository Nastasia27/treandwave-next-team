"use client";

import { useState } from "react";
import { addColor } from "../actions/colorsActions";
import NotificationModal from "../notificationModal";
import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom'

const initialState = {
  message: '',
};

function SubmitButton() {
    const { pending, error } = useFormStatus();

    return (
        <button 
            type="submit" 
            className="bg-[#336CFF] p-2 rounded text-white uppercase">
            {pending ? 'Додавання...' : 'Додати колір'}
        </button>
    );
}

export function AddColorForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, formAction] = useFormState(addColor, initialState);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="">
            <button
                className="bg-[#336CFF] p-2 px-3 rounded text-white"
                onClick={handleOpenModal}
            >
                Додати колір
            </button>
            {isModalOpen && (
                <div className="font-mont h-screen absolute top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-black/40 ">
                    <div className="bg-white relative p-10 rounded lap:w-1/2 w-1/2">
                        <button 
                            className="absolute top-5 right-5"
                            onClick={handleCloseModal}>
                                x
                        </button>
                        <form action={formAction} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="color">Введіть назву кольору</label>
                                <input type="text" id="color" name="color" required  className="focus:outline-none bg-white ring-0 ring-offset-0 p-3 rounded w-full border-[#BABABA] border-[1px] hover:ring-[#336CFF] hover:border-[#336CFF] focus:ring-[#336CFF] focus:border-[#336CFF]"/>
                            </div>
                            
                            <SubmitButton />
                        </form>
                    </div>
                </div>
            )}
            <div className="w-full h-full relative">
                <NotificationModal message={state?.message}/>
            </div>
        </div>
    );
}