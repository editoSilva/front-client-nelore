import { SendDocumentType } from "@/@types/costumer/document/DocumentTypes";
import { ApiPostDocument } from "@/services/costumer/documents/ApiDocuments";
import { create } from "zustand";

interface DocumentmentActions {
    isLoading: boolean
    fetchDocumentments: (payload: SendDocumentType) => Promise<void>;
}

export const UseDocumentStore = create<DocumentmentActions>((set) => ({

    isLoading: false,
    fetchDocumentments: async (data) => {
        set({
                               
            isLoading: true,
        });
         try {

                            const response = await ApiPostDocument({ data }) // Correção: await para pegar os dados corretamente

                            console.log('resposta docs', response)
                
                            set({
                               
                                isLoading: false,
                            });
                        } catch (error) {
                            console.error("Erro ao buscar os dados:", error);
                            set({ isLoading: false });
                        } finally {
                            set({ isLoading: false });
                        }
    }

}))



