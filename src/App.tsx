import { useEffect, useState } from "react";
import axios from 'axios';
import { CarritoComponent } from "./components/CarritoComponent";
import { HeaderComponent } from "./components/HeaderComponent";
import { ListadoProductosComponent } from "./components/ListadoProductosComponent";
import Producto from "./interfaces/Producto";
import { CarritoProvider, useCarrito } from "./context/CarritoContext";

function App() {
  const [showCarrito, setShowCarrito] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  const { productosSeleccionados } = useCarrito();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get<Producto[]>('http://localhost:3001/productos');
      setProductos(response.data);
    } catch (error) {
      console.log("Error al obtener los productos", error);
    }
  }

  const handleShowCarrito = () => {
    setShowCarrito(!showCarrito);
  }

  return (
    <div
      className="min-h-full bg-fixed"
      style={{ backgroundImage: "url(background.webp)" }}
    >
      <HeaderComponent cantProductos={productosSeleccionados.length} handleShowCarrito={handleShowCarrito} />
      <div className="flex justify-center min-h-full">
        <div style={{ display: "grid", placeSelf: "center", margin: "3em 0" }} >
          {showCarrito
            ? <CarritoComponent handleShowCarrito={handleShowCarrito} />
            : <ListadoProductosComponent listadoProductos={productos} />}
        </div>
      </div>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <CarritoProvider>
      <App />
    </CarritoProvider>
  )
};
