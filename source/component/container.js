export default ({children, style = {}, className, fill = false}) => {
    if (fill === true) {
        style.width = '100%';
        style.height = '100%';
    }
    return <div style={style} className={className}>{children}</div>;
};
