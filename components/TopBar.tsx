import { Logo } from "./Logo";
import { ModeToggle } from "./theme-toggle";

export const TopBar = () => {
    return (
        <div className="flex w-full justify-between ">
            <div>
                <Logo />
            </div>
            <div className="flex items-center">
                <ModeToggle />
            </div>
        </div>
    );
}