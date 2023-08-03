import styled from "styled-components";
import { useCarrito } from "../context/CarritoContext";
import Producto from "../interfaces/Producto";
import { ProductoContainerComponent } from "./ProductoContainerComponent";

interface Props {
  listadoProductos: Producto[];
}

export const ListadoProductosComponent = ({ listadoProductos }: Props) => {

  const { agregarProducto, reducirCantGemas } = useCarrito();

  const handleSelectProducto = (prod: Producto) => {
    reducirCantGemas(prod.precio);
    agregarProducto(prod);
  }

  return (
    <MainContainer>
      {
        listadoProductos.map((producto) => <ProductoContainerComponent producto={producto} handleSelectProducto={handleSelectProducto} />)
      }
    </MainContainer>
  );
};

const MainContainer = styled('div')({
  display: "grid",
  gridTemplateColumns: "repeat(2, 0fr)",
  justifyItems: "center",
  gap: "1em"
})
