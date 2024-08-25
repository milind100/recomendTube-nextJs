const copyToClipboard = (copyText) => {
  // Fallback for unsupported browsers
  const textArea = document.createElement("textarea");
  textArea.value = copyText;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");

  document.body.removeChild(textArea);
};

export default copyToClipboard;
