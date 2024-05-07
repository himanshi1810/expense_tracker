export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center ${
          outline ? "border border-blue-100 bg-transparent" : "bg-blue-400"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-white-100 ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-white-100"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }