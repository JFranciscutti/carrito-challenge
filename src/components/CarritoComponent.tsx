import axios from "axios";
import { useCarrito } from "../context/CarritoContext";
import Producto from "../interfaces/Producto";
import { ProductoCheckoutContainer } from "./ProductoCheckoutContainer";
import { Colors } from "../utils/Colors";

interface Props {
  handleShowCarrito: () => void;
}

export const CarritoComponent = ({ handleShowCarrito }: Props) => {

  const { productosSeleccionados, eliminarProducto, incrementarCantGemas } = useCarrito();


  const handleFinalizarCompra = async () => {
    try {
      const productIds = productosSeleccionados.map((producto) => producto.id);
      const response = await axios.post('http://localhost:3001/compras', productIds);
      console.log(response.data);
    } catch (error) {
      console.log("Error al comprar", error)
    }
  }

  const handleEliminarProducto = (prod: Producto) => {
    incrementarCantGemas(prod.precio)
    eliminarProducto(prod.id);
  }


  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "38em" }}>
      <div style={{ marginBottom: "2em" }}>
        <button
          style={{ backgroundColor: Colors.PURPLE, color: "white", padding: "0.3em .5em", borderRadius: 10, }}
          onClick={handleShowCarrito}
        >
          Volver
        </button>
      </div>
      <div>
        {
          productosSeleccionados.map((producto: Producto) => (
            <>
              <ProductoCheckoutContainer producto={producto} handleEliminarProducto={handleEliminarProducto} />
              <div style={{ backgroundColor: "gray", height: "2px" }}></div>
            </>))
        }
      </div>
      <div style={{ display: "flex", marginTop: "2em" }}>
        {productosSeleccionados.length > 0
          ? (<button
            style={{ backgroundColor: Colors.PURPLE, color: "white", padding: "0.3em .5em", borderRadius: 10, width: "100%" }}
          >
            Comprar
          </button>)
          : (<p>No hay productos seleccionados</p>)
        }
      </div>
    </div>
  );
};
