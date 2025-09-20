import React from "react";

// PUBLIC_INTERFACE
export default function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  textarea = false,
  rows = 4,
  rightAdornment,
  leftAdornment,
}) {
  /** Accessible input/textarea with adornments. */
  const sharedStyle = {
    width: "100%",
    border: "1px solid var(--color-border)",
    background: "var(--color-surface)",
    color: "var(--color-text)",
    borderRadius: 10,
    padding: leftAdornment || rightAdornment ? "10px 12px 10px 36px" : "10px 12px",
    transition: "border var(--transition-fast), box-shadow var(--transition-fast)"
  };

  const id = React.useId();

  return (
    <div style={{ width: "100%" }}>
      {label && (
        <label htmlFor={id} style={{ display: "block", fontSize: 13, color: "var(--color-text-muted)", marginBottom: 6 }}>
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        {leftAdornment && (
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", opacity: 0.7 }}>
            {leftAdornment}
          </span>
        )}
        {textarea ? (
          <textarea
            id={id}
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            style={{ ...sharedStyle, resize: "vertical" }}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            style={sharedStyle}
          />
        )}
        {rightAdornment && (
          <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", opacity: 0.8 }}>
            {rightAdornment}
          </span>
        )}
      </div>
    </div>
  );
}
