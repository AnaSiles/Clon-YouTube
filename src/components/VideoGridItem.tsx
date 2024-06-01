import { useEffect, useRef, useState } from "react"
import { formatDuration } from "../utils/formatDuration"
import { formatTimeAgo } from "../utils/formatTiemAgo"

// Definición de las propiedades esperadas para el componente VideoGridItem
type VideoGridItemProps = {
    id: string
    title: string
    channel: {
        id: string
        name: string
        profileUrl: string
    }
    views: number
    postedAt: Date
    duration: number
    thumbnailUrl: string
    videoUrl: string
}

// Formateador de vistas usando Intl.NumberFormat para mostrar números de forma compacta
const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {notation:"compact"})

// Componente VideoGridItem
export function VideoGridItem({
    id,
    title,
    channel,
    views,
    postedAt,
    duration,
    thumbnailUrl,
    videoUrl
}: VideoGridItemProps) {
    // Estado para controlar si el video está en reproducción
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    // Referencia al elemento video
    const videoRef = useRef<HTMLVideoElement>(null)

    // Efecto que se ejecuta cuando isVideoPlaying cambia
    useEffect(() => {
        if(videoRef.current == null) return // Si la referencia al video es nula, se sale del efecto temprano

        if(isVideoPlaying){
            videoRef.current.currentTime = 0 //Reinicia el tiempo de reproducción a 0
            videoRef.current.play() //Reproduce el video
        }else {
            videoRef.current.pause() //Pausa el video
        }
    }, [isVideoPlaying]) //Dependencia del esfecto en isVideoPlaying

        return (
        //Contenedor principal del item del vídeo
        <div 
        className="flex flex-col gap-2" 
        onMouseEnter={() => setIsVideoPlaying(true)} //Inicia la reproducción del video al entrar el mouse
        onMouseLeave={() => setIsVideoPlaying(false)} //Pausa la reproducción del video al salir el mouse
        > 
            <a href={`/watch?v=${id}`} className="relative aspect-video">
                <img src={thumbnailUrl} className={`block w-full h-full object-cover transition-[border-radius] duration 200
                  ${isVideoPlaying ?"rounded-none" : "rounded-xl"}`  
                } // Cambia los bordes redondeados según el estado de reproducción
                />
                <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-.5 rounded">
                    {formatDuration(duration)}  {/* Muestra la duración del video */}
                </div>
                <video 
                className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"}`} // Ajusta la opacidad del video según el estado de reproducción
                ref={videoRef} 
                muted 
                playsInline 
                src={videoUrl}/>
            </a>
            <div className="flex gap-2">
                <a href={`/@${channel.id}`} className="flex-shrink-0">
                    <img  className="w-12 h-12 rounded-full" src={channel.profileUrl}/> {/* Imagen de perfil del canal */}
                </a>
                <div className="flex flex-col">
                    <a href={`/watch?v=${id}`} className="font-bold">
                        {title} {/* Título del video */}
                    </a>
                    <a href={`/@${channel.id}`} className="text-secondary-text text-sm">
                        {channel.name} {/* Nombre del canal */}
                    </a>
                    <div className="text-secondary-text text-sm">
                        {VIEW_FORMATTER.format(views)} Views ● {formatTimeAgo(postedAt)} {/* Formato de vistas y tiempo publicado */}
                    </div>
                </div>

            </div>
        </div>
    )
}