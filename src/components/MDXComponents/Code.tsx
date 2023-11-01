type Props = {
  children?: string | React.ReactNode;
};

export default function Code(props: Props) {
  return (
    <>
      {typeof props.children === "string" ? (
        <code className="p-0.5 rounded text-black dark:text-white">
          {props.children}
        </code>
      ) : (
        <code>{props.children}</code>
      )}
    </>
  );
}
