const ExternalLinkOpener = ({ url, text = "Open External Link", className, ariaLabel }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "This would take you to an external website that opens in a new tab. Do you want to continue anyway?"
    );

    if (confirmed) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      onClick={handleClick}
      className={className || "external-link"}
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      {text}
    </a>
  );
};

export default ExternalLinkOpener;
