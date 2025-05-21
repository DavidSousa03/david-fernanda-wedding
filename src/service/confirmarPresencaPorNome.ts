import api from "../data/nocodbApi";

interface Convidado {
  Id: number;      
  Email?: string;
  Convidado?: string;
}


export const buscarTodosConvidados = async () => {
  const res = await api.get("/tables/mz5cxkobmior7n5/records");
  return res.data?.list || [];
};

export const verificarSeConfirmado = async (convidado: Convidado): Promise<boolean> => {
  const res = await api.get(`/tables/mz5cxkobmior7n5/records/${convidado.Id}`);
  return res.data?.Confirmado === true;
};

export const confirmarPresencaPorNome = async (convidado: Convidado, email?: string) => {
  return api.patch(`/tables/mz5cxkobmior7n5/records`, {
    Id: convidado.Id,
    Confirmado: true,
    Data: new Date().toISOString(),
    Email: email || convidado.Email,
  });
};
