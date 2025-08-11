"use client";
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Modal } from "@/components/ui/Modal";

export const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, item, isLoading }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center">
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Delete Item</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Are you sure you want to delete <span className="font-semibold text-gray-900 dark:text-gray-50">{item?.itemName}</span>? This action cannot be undone.</p>
                <div className="flex justify-center gap-4 mt-8">
                    <button onClick={onClose} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">Cancel</button>
                    <button onClick={onConfirm} disabled={isLoading} className="flex items-center gap-2 bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 disabled:bg-red-400">
                        {isLoading ? <Loader2 className="animate-spin" size={20}/> : "Delete"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
