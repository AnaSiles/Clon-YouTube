import { ReactNode, createContext, useContext, useEffect, useState } from "react"

// Definición de las propiedades esperadas para el componente SidebarProvider
type SidebarProviderProps={
    children: ReactNode // El componente espera recibir hijos de tipo ReactNode
}

// Definición del tipo de contexto SidebarContext
type SidebarContextType ={
    isLargeOpen: boolean; // Estado que indica si la barra lateral grande está abierta
    isSmallOpen: boolean; // Estado que indica si la barra lateral pequeña está abierta
    toggle: () => void; // Función para alternar el estado de la barra lateral
    close: () => void; // Función para cerrar la barra lateral
}

// Creación del contexto SidebarContext con un valor inicial de null
const SidebarContext = createContext<SidebarContextType | null>(null)

// Hook personalizado para usar el contexto SidebarContext
export function useSidebarContext(){
    const value=useContext (SidebarContext) //Obtiene el valor del contexto
    if (value == null) throw Error("Cannot use outside of SidebarProvider") // Si el contexto es null, lanza un error

    return value // Devuelve el valor del contexto
}

// Componente proveedor del contexto SidebarContext
export function SidebarProvider({children}:
    SidebarProviderProps
) {

const[isLargeOpen, setIsLargeOpen] = useState(true) // Estado para la barra lateral grande
const [isSmallOpen, setIsSmallOpen] = useState(false) // Estado para la barra lateral pequeña

// Efecto para manejar el evento de redimensionamiento de la ventana
useEffect(() => {
    const handler = () => {
        if (!isScreenSmall()) setIsSmallOpen(false) // Cierra la barra lateral pequeña si la pantalla no es pequeña
    }

    window.addEventListener("resize", handler) // Agrega un listener al evento de redimensionamiento

    return () => window.removeEventListener("resize", handler) // Limpia el listener al desmontar el componente
}, [])

// Función que verifica si la pantalla es pequeña
function isScreenSmall(){
    return window.innerWidth <1024 // Devuelve true si el ancho de la pantalla es menor a 1024px
}

// Función para alternar el estado de la barra lateral
function toggle() {
    if (isScreenSmall()) {
        setIsSmallOpen(s => !s) // Alterna el estado de la barra lateral pequeña si la pantalla es pequeña
    } else {
        setIsLargeOpen(l => !l) // Alterna el estado de la barra lateral grande si la pantalla no es pequeña
    }
}

// Función para cerrar la barra lateral
function close() {
    if (isScreenSmall()) {
        setIsSmallOpen(false) //Cierra la barra lateral pequeña si la pantalla es pequeña
    } else {
        setIsLargeOpen(false) // Cierra la barra lateral grande si la pantalla no es pequeña
    }
}
// Proveedor del contexto SidebarContext con los valores y funciones definidas
    return <SidebarContext.Provider value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close
    }}>
        {children}
    </SidebarContext.Provider>
}