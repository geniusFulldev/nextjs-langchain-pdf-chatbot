import ThemeToggler from "./ThemeToggler";

export default function Header() {

    return (
        <div className="h-[60px] px-4 container-sm flex justify-between items-center">
            <h5>PDF Chat</h5>
            <div>
                <ThemeToggler />
            </div>
        </div>
    )
}