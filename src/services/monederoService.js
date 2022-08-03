import axios from "axios";

const URL = "http://localhost:3001/api/v1/monedero";
export const listarService = async () => {
    let res = await axios.get(URL);
    return res;
}

export const guardarService = async (datos) => {
    let res = await axios.post(URL, datos);
    return res;
}

export const mostrarService = async (id) => {
    let res = await axios.get(URL+'/'+id);
    return res;
}

export const actualizarService = async (datos) => {
    let res = await axios.put(URL, datos);
    return res;
}

export const eliminarService = async (id) => {
    let res = await axios.delete(URL+'/'+id);
    return res;
}