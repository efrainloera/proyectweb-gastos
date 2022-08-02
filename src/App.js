import './App.css';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  listarService, 
  guardarService, 
  mostrarService, 
  //actualizarService, 
  eliminarService
} from "./services/monederoService";



function App() {
  const [t, i18n] = useTranslation("global")
  const [count, setCount] = useState(0)
  
  const valorInicial = {
    id: "",
    periodo: "",
    tipo: "",
    descripcion: "",
    monto: ""
  };
  const [lista,setLista] = useState([]);
  const [dato,setDato] = useState(valorInicial);
  const handleChange = (e) => {
    const campo = e.target.name;
    const valor = e.target.value;
    setDato({...dato, [campo]: valor});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await guardarService(dato);
    setDato(valorInicial);
    listarDatos(res.data);  //modificar (res.data)
  }
  const handleShow = async (id) => {
    const res = await mostrarService(id);
    setDato(res.data);
  }
  const handleDelete = async (id) => {
    const res = await eliminarService(id);
    listarDatos(res.data); //modificar (res.data)
  }
  const listarDatos = async () =>{
    const res =  await listarService();
    setLista(res.data);
  }

  useEffect(()=>{
    listarDatos();
  },[]);

  
  return (
    <div className=''>
      <nav>
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          
          
            <div onClick={() => { i18n.changeLanguage("en") }} className="btn btn-danger">
              {t("navbar.ingles")}
            </div>
            <div onClick={() => { i18n.changeLanguage("es") }} className="btn btn-danger">
              {t("navbar.espanol")}
            </div>

         
        
        </div>
      </nav>

      <div className='w-2/4' ></div>

    <div className="container mt-3">
      <div className="row">
        <div className="col-md-4">
          <h3>{t("body.des")}</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} value={dato.periodo} className="form-control" name="periodo" placeholder={t("body.periodo")} />
            <input type="text" onChange={handleChange} value={dato.tipo} className="form-control" name="tipo" placeholder={t("body.categoria")} />
            <input type="text" onChange={handleChange} value={dato.descripcion} className="form-control" name="descripcion" placeholder={t("body.descripcion")} />
            <input type="number" onChange={handleChange} value={dato.monto} className="form-control" name="monto" placeholder={t("body.monto")} />
            <button className="btn btn-primary">{t("body.guar")}</button>
          </form>
        </div>
        <div className="col-md-8">
          <h3>{t("body.tab")}</h3>
          <table className="table">
             <thead>
              <tr>
                <th>{t("body.periodo")}</th>
                <th>{t("body.descripcion")}</th>
                <th>{t("body.categoria")}</th>
                <th>{t("body.monto")}</th>
                <th className="text-center">{t("body.acciones")}</th>
              </tr>
             </thead>
             <tbody>
              {lista.map(item=>(
                <tr key={item._id}>
                  <td>{item.periodo}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.tipo}</td>
                  <td>{item.monto}</td>
                  <td className="text-center">
                    <button className="btn btn-secondary me-2">Editar</button>
                    <button onClick={()=>handleDelete(item._id)} className="btn btn-danger">Eliminar</button>
                  </td>
                </tr>
              ))}
             </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;