interface LogoProps {
    className?: string;
}

const ApplicationLogo: (props: LogoProps) => JSX.Element = (props: LogoProps) => (
    <img src='splash_logo.png' {...props} />
)

export default ApplicationLogo
