import axios from "axios";
import { useCarrito } from "../context/CarritoContext";
import Producto from "../interfaces/Producto";
import { ProductoCheckoutContainer } from "./ProductoCheckoutContainer";
import { Colors } from "../utils/Colors";
import { useState } from "react";

interface Props {
  handleShowCarrito: () => void;
}

export const CarritoComponent = ({ handleShowCarrito }: Props) => {

  const { productosSeleccionados, eliminarProducto, incrementarCantGemas, resetearCarrito } = useCarrito();

  const [showLista, setShowLista] = useState<boolean>(true);

  const handleFinalizarCompra = async () => {
    console.log(productosSeleccionados);
    try {
      const productIds = productosSeleccionados.map((producto) => producto.id);
      const response = await axios.post('http://localhost:3001/compras', { itemsId: productIds });
      setShowLista(false);
      resetearCarrito();

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
          onClick={() => { setShowLista(true); handleShowCarrito() }}
        >
          Volver
        </button>
      </div>
      {showLista && <div>
        {
          productosSeleccionados.map((producto: Producto) => (
            <>
              <ProductoCheckoutContainer producto={producto} handleEliminarProducto={handleEliminarProducto} />
              <div style={{ backgroundColor: "gray", height: "2px" }}></div>
            </>))
        }
      </div>}

      {
        !showLista && <div>
          <p>Compra realizada!</p>
        </div>
      }
      <div style={{ display: "flex", marginTop: "2em" }}>
        {productosSeleccionados.length > 0 || !showLista
          ? (
            <button
              style={{
                backgroundColor: showLista ? Colors.PURPLE : "gray",
                color: "white", padding: "0.3em .5em", borderRadius: 10, width: "100%"
              }}
              onClick={handleFinalizarCompra}
              disabled={!showLista}
            >
              Comprar
            </button>)
          : (<p>No hay productos seleccionados</p>)
        }
      </div>
    </div>
  );
};
