import styled from "styled-components";
import Producto from "../interfaces/Producto";
import { Colors } from "../utils/Colors";

interface Props {
    producto: Producto;
    handleEliminarProducto: (prod: Producto) => void;
}
export const ProductoCheckoutContainer = ({ producto, handleEliminarProducto }: Props) => {

    return (
        <MainContainer>
            <ImageContainer>
                <img src={producto.imagen} />
            </ImageContainer>
            <p>{producto.nombre}</p>
            <button onClick={() => handleEliminarProducto(producto)}            >
                X
            </button>
        </MainContainer>
    )
}

const MainContainer = styled('div')({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "0.4em 2em",
    backgroundColor: Colors.BACKGROUND_GRAY,
    color: Colors.WHITE
});

const ImageContainer = styled('div')({
    backgroundColor: "gray",
    borderRadius: 20
})