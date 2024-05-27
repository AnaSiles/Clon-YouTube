import { Bell, Menu, UploadIcon, User } from "lucide-react"
import logo from "../assets/MyTubeLogo.png" 
import { Button } from "../components/Button"

export function PageHeader() {
    return (<div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
        <div className="flex gap-4 items-center flex-shrink-0">
            <Button variant="ghost" size="icon" >
                <Menu />
            </Button>
            <a href="/">
                <img src={logo} alt="Logo" className="h-12" />
            </a>
        </div>
        <div></div>
        <div className="flex flex-shrink-0 md:gap-2">
            <Button size= "icon" variant="ghost">
                <UploadIcon/>
            </Button>
            <Button size= "icon" variant="ghost">
                <Bell/>
            </Button>
            <Button size= "icon" variant="ghost">
                <User/>
            </Button>
        </div>
    </div>
    )
}