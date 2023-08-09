import ThemeToggler from "./theme-toggler";

export default function Header() {

    return (
        <div className="h-[60px] px-4 container-sm flex justify-between items-center border-gray-500 border-b-2">
            <h5>PDF Chat</h5>
            <div>
                <ThemeToggler />
            </div>
        </div>
    )
}