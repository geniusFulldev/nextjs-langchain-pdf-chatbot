import Avatar from "./avatar";
import ThemeToggler from "./theme-toggler";

export default function Header() {

    return (
        <div className="h-[60px] px-4 container-sm flex justify-between items-center border-gray-500 border-b-2">
            <h5>PDF Chat</h5>
            <div className="flex items-center space-x-4">
                <Avatar />
                <ThemeToggler />
            </div>
        </div>
    )
}