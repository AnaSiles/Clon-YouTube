//Importaciones necesarias desde las librerias
import { ChevronLeft, ChevronRight } from "lucide-react";//Importación de las flechas desde la libreria Lucide
import { Button } from "./Button";//Importación del componente Button
import { useEffect, useRef, useState } from "react";//Importación de los hooks de React

//Definición del tipo de propiedades para CategoryPills
type CategoryPillProps = {
    categories: string[] //Lista de categoría
    selectedCategory: string //Categoría seleccionada
    onSelect: (category:string) => void //Función para manejar la seleccion de categoría
}

//Definición de la constante para la cantidad del desplazamiento
const TRANSLATE_AMOUNT = 200

//Componente CategoryPills
export function CategoryPills ({categories, selectedCategory, onSelect}:CategoryPillProps){
    const [translate, setTranslate]= useState(0) //Estado para manejar el desplazamiento horizontal
    const [isLeftVisible, setIsLeftVisible] = useState(false) //Estado para mostrar/ocultar el botón izquierdo
    const [isRightVisible, setIsRightVisible] = useState(false) //Estado para mostrar/ocultar el botón derecho
    const containerRef = useRef<HTMLDivElement>(null) //Referencia al contenedor de las categorías

    //Hook useEffect para observar cambios en el tamaño del contenedor
useEffect(() => {
    if (containerRef.current == null) return

    const observer = new ResizeObserver(entries => {
        const container = entries[0]?.target
        if (container == null) return

        setIsLeftVisible(translate>0)
        setIsRightVisible(translate < (container.scrollWidth - container.clientWidth))
    })

    observer.observe(containerRef.current) //Aquí se comienza a observar el contenedor

    return () => {
        observer.disconnect()//Aquí se termina de observar el contenedor	
    }

}, [translate]) //Se ejecuta cada vez que cambia el valor de `translate`

    return (
    <div 
    ref={containerRef} //Asigmamos la referencia al contenedor
    className="overflow-x-hidden relative">
        <div 
        className="flex whitespace-nowrap gap-3 transition-transform
        w-[max-content]" style={{transform: `translateX(-${translate}px)`}}> {/*Aplicamos el desplazamiento horizontal*/}
            {categories.map(category => ( //Recorremos la lista de categorías
            <Button 
            key={category} //Asignamos una clave única para cada botón usando el nombre de la categoría
            onClick={() => onSelect(category)} //Definimos un evento onClick para el botón. Cuando clicamos en el botón, se llama a la función onSelect pasando la cartegoría como argumento
            variant={selectedCategory === category ? "dark" : "default"} //Aplica la variante dark si la categoría es seleccionad, si no aplica la variante default
            className="py-1 px-3 rounded-lg whitespace-nowrap">{category}</Button>//Añadimos clases de Tailwind CSS para darle estilo al botón
            //py-1 para padding vertical pequeño, px-3 para paddingo horizontal mediano, rounded-lg para redondear el botón, whitespace-nowrap para evitar que el texto dentro del botón se divida en varias líneas
            //{category} para mostrar el nombre de la categoría
        ))}
            
        </div>
    {isLeftVisible && ( //Si isLeftVisible es true, muestra el botón izquierdo
        
    
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
            <Button
            variant="ghost" //De nuevo aplicamos la variante ghost al botón que tiene fondo transparente y cambia de color al pasar el cursor sobre él
            size="icon" //Aplica el tamaño icon al botón, estilizando el botón parea que sea adecuado para los iconos
            className="h-full aspect-square w-auto p-1.5"//Aplicamos clases de Tailwind CSS. h-full toma la altura completa del contenedor padre, aspect-square proporciona
            //un aspecto cuadrado asegurando que la altura y la anchura sean igualesw-autos para que el contenido se ajuste al tamaño del contenedor, p-1.5 para padding interno
            onClick={() => { //Definimos de nuevo un evento onClick que se ejecuta cuando se hace clic en el botón
                setTranslate(translate =>{ //Actualiza el estado translate usando su valoractual para calcular el nuevo valor
                    const newTranslate = translate - TRANSLATE_AMOUNT //Calcula el nuevo valor de translate restando una cantidad definida(TRANSLATE_AMOUNT) de pixels
                    if (newTranslate <=0) return 0 //Si el nuevo valor de traslate es menor o igual a 0, retorna 0 para evitar que se desplace más allá del iicio
                    return newTranslate // Si el nuevo valor de translate es mayor que 0, lo retorna y actualiza el nuevo valor de translate
                })
            }}
            >
                <ChevronLeft/> {/*Aplicamos el icono de la flecha izquierda*/}
            </Button>
            
        </div>
        )}
        
    {isRightVisible && (
    
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
            <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
                setTranslate (translate =>{
                    console.log(containerRef, translate)
                if (containerRef.current == null) { //Si containerRef es nulo, retorna el valor actal de translate sin cambios
                    return translate
                }
                const newTranslate = translate + TRANSLATE_AMOUNT //Calcula el nuevo valor de translate sumando una cantidad definida(TRANSLATE_AMOUNT) de pixels
                const edge = containerRef.current.scrollWidth //Obtiene el ancho total del contenido del contenedor
                const width = containerRef.current.clientWidth //Obtiene el ancho visible del contenido del contenedor
                if (newTranslate + width >= edge) {//Si el nuevo valor de translate mas el ancho visible del contenedor exceden el borde dercho, ajusta translate para que el contenido no se deplace más allá del borde derecho
                    return edge - width //retorna el nuevo valor de translate si no excede el borde derecho
                }
                return newTranslate
                })
            }}
            >
                <ChevronRight/>
            </Button>
            
        </div>
        )}
    </div>
    )
}