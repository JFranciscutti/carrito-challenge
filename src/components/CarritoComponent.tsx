import axios from "axios";
import { useCarrito } from "../context/CarritoContext";
import Producto from "../interfaces/Producto";
import { ProductoCheckoutContainer } from "./ProductoCheckoutContainer";
import { Colors } from "../utils/Colors";
import { Fragment, useState } from "react";
import styled from "styled-components";

interface Props {
  handleShowCarrito: () => void;
}

export const CarritoComponent = ({ handleShowCarrito }: Props) => {

  const { productosSeleccionados, eliminarProducto, incrementarCantGemas, resetearCarrito } = useCarrito();

  const [showLista, setShowLista] = useState<boolean>(true);

  const handleVolver = () => {
    setShowLista(true);
    handleShowCarrito();
  }

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
    <MainContainer>
      <VolverButton onClick={handleVolver}
      >
        Volver
      </VolverButton>
      {showLista &&
        <div>
          {
            productosSeleccionados.map((producto: Producto) => (
              <Fragment key={producto.id}>
                <ProductoCheckoutContainer producto={producto} handleEliminarProducto={handleEliminarProducto} />
                <Divider />
              </Fragment>))
          }
        </div>}

      {!showLista && <p>Compra realizada!</p>}
      <div style={{ marginTop: "2em" }}>
        {productosSeleccionados.length > 0 || !showLista ? (
          <ComprarButton
            style={{ backgroundColor: showLista ? Colors.PURPLE : Colors.GRAY }}
            onClick={handleFinalizarCompra}
            disabled={!showLista}
          >
            Comprar
          </ComprarButton>)
          : (
            <p>No hay productos seleccionados</p>
          )}
      </div>
    </MainContainer>
  );
};

const MainContainer = styled('div')({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  width: "38em"
});

const VolverButton = styled('button')({
  backgroundColor: Colors.PURPLE,
  color: Colors.WHITE,
  padding: "0.3em .5em",
  borderRadius: 10,
  marginBottom: "2em",
  width: "12%"
})

const Divider = styled('div')({
  backgroundColor: Colors.GRAY,
  height: "2px"
});

const ComprarButton = styled('button')({
  color: Colors.WHITE,
  padding: "0.3em .5em",
  borderRadius: 10,
  width: "100%"
});
