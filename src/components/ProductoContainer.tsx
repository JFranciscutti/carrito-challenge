import styled from "styled-components";
import { useCarrito } from "../context/CarritoContext";
import Producto from "../interfaces/Producto";
import { Colors } from "../utils/Colors";

interface Props {
    producto: Producto;
    handleSelectProducto: (prod: Producto) => void;
}

const MainContainer = styled('div')({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BACKGROUND_GRAY,
    margin: "1em 0 0 0",
    padding: "0 1em",
    width: "18em",
    borderRadius: 10
});

const PriceContainer = styled('div')({
    display: "flex",
    backgroundColor: Colors.GREEN,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    padding: "0 0.7em",
    margin: "1em 0",
    alignSelf: "flex-end"
});

const AgregarButton = styled('button')({
    display: "flex",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    padding: "0.4em",
    margin: "1em 0",
    alignSelf: "flex-end",
    width: "100%"
});

const ImagenContainer = styled('div')({
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
});

const BodyContainer = styled('div')({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    margin: "1em 0",
    padding: "0 5%"
});

const InfoContainer = styled('div')({
    width: "100%",
    height: "6em",
    alignItems: "flex-start"
})

export const ProductoContainer = ({ producto, handleSelectProducto }: Props) => {

    const { cantGemas, productosSeleccionados } = useCarrito();

    const generarTextoPrecio = () => {
        const precio = producto.precio;
        return precio === 1 ? `${precio} Gema` : `${precio} Gemas`;
    }

    const esSeleccionable = () => {
        return (!productosSeleccionados.includes(producto) || !productosSeleccionados.map((p) => p.categoria).includes(producto.categoria)) && cantGemas >= producto.precio;
    }

    return (
        <MainContainer>
            <PriceContainer>
                {generarTextoPrecio()}
            </PriceContainer>
            <ImagenContainer>
                <img src={producto.imagen} height="100" width="100" />
            </ImagenContainer>
            <BodyContainer>
                <InfoContainer>
                    <span style={{ paddingBottom: "0.4em", fontWeight: "bold" }}>{producto.nombre}</span>
                    <p style={{ color: Colors.GRAY_TEXT }}>{producto.descripcion}</p>
                </InfoContainer>
                <div style={{ width: "100%", marginTop: "1em" }}>
                    <span style={{ color: Colors.GRAY_TEXT }}>{`Categoria: ${producto.categoria}`}</span>
                </div>
                <AgregarButton
                    style={{ backgroundColor: esSeleccionable() ? Colors.PURPLE : "gray", }}
                    onClick={() => esSeleccionable() && handleSelectProducto(producto)}
                    disabled={!esSeleccionable()}
                >
                    Agregar
                </AgregarButton>
            </BodyContainer>
        </MainContainer >)
}