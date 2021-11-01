const ClipboardJs = require("clipboard");
exports.onClientEntry = () => {
  new ClipboardJs("button.copy-btn");
};
