//Importaciones necesarias desde las librerias
import { cva, VariantProps } from "class-variance-authority" //cva para definir clases condicionales, VariantProps para manejar las variantes de estilos
import { ComponentProps } from "react" // ComponentProps para extender las propiedades básicas de un botón HTML
import { twMerge } from "tailwind-merge" // twMerge para combinar clases de Tailwind evitando duplicaciones

// Definición de estilos condicionales para el botón usando cva
export const buttonStyles = cva (["transition-colors"], //Clase base aplicada a todos los notones para transición de colores
    {
        variants: { //Variantes de estilos para el botón
            variant: {
                default: ["bg-secondary", "hover:bg-secondary-hover"], //Estilo por defecto
                ghost: ["hover:bg-gray-100"], //Estilo para el botón de tipo "ghost"
                dark: ["bg-secondary-dark", "hover:bg-secondary-dark-hover", "text-secondary"] //Estilos para el botón tipo "dark"
            },
            size: { //Variantes de tamaño para el botón
                default: ["rounded", "p-2"],//Tamaño por defecto
                icon: [
                    "rounded-full",//Botón redondeado
                    "w-10", //Ancho fijo
                    "h-10",//Alto fijo
                    "flex",//Contenedor flexible
                    "items-center",//Centrado verticalmente del contenido
                    "justify-center",//Centrado horizontalmente del contenido
                    "p-2.5",//padding interno
                ],
            },
    },
    defaultVariants: { //Variantes predeterminadas
        variant: "default", //Variante de estilo por defecto
        size: "default" //Tamaño por defecto
    }
})

//Definición del tipo de propiedades del botón
type ButtonProps = VariantProps <typeof buttonStyles> & ComponentProps <"button">

//Definición del componente Button
export function Button ({variant, size, className, ...props}: ButtonProps){
    return (
        //Renderiza un botón HTML con las propiedades combinadas y las clases de estilo aplicadas
    <button 
    {...props} 
    className= {twMerge(buttonStyles({variant, size}), className)}/>
)
}