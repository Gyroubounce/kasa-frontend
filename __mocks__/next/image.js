/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

export default function Image(props) {
  const {
    onClick,
    onTouchStart,
    onTouchEnd,
    onLoad,
    ...rest
  } = props;

  return (
    <img
      {...rest}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onLoad={onLoad}
    />
  );
}
