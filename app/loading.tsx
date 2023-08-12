import Spinner from "@/components/ui/spinner";

export default function RootLoading() {

    return (
        <div className="dark:bg-black fixed top-0 left-0 right-0 bottom-0">
            <Spinner />
        </div>
    );
}