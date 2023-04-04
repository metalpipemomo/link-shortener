type IconProps = {
    size: number;
    color: string;
    className?: string;
};

type CopyFieldProps = {
    url: string;
};

type LinkDisplayProps = {
    fullLink: string;
    newLink: string;
    key: string;
    copyLink: (newLink: string, setStyle: (style: string) => void, setIcon: (icon: JSX.Element) => void) => void;
    deleteLink: (newLink: string) => void;
}