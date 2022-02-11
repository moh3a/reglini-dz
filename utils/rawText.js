import parse from "html-react-parser";

// get raw text from string containing html

export const getRawText = (text) => {
  let raw_text = "";

  if (parse(text).props && typeof parse(text).props.children === "string") {
    raw_text += parse(text).props.children;
  } else if (
    parse(text).props &&
    typeof parse(text).props.children !== "string"
  ) {
    if (typeof parse(text).props.children.props.children === "string") {
      raw_text += parse(text).props.children.props.children;
    } else if (
      typeof parse(text).props.children.props.children.props.children ===
      "string"
    ) {
      raw_text += parse(text).props.children.props.children.props.children;
    } else if (
      typeof parse(text).props.children.props.children.props.children.props
        .children === "string"
    ) {
      raw_text +=
        parse(text).props.children.props.children.props.children.props.children;
    }
  } else if (parse(text).length > 0) {
    parse(text).map((element) => {
      if (typeof element.props.children === "string") {
        raw_text += element.props.children + " ";
      } else if (typeof element.props.children.props.children === "string") {
        raw_text += element.props.children.props.children + " ";
      } else if (
        typeof element.props.children.props.children.props.children === "string"
      ) {
        raw_text += element.props.children.props.children.props.children + " ";
      } else if (
        typeof element.props.children.props.children.props.children.props
          .children === "string"
      ) {
        raw_text +=
          element.props.children.props.children.props.children.props.children +
          " ";
      }
    });
  }

  return raw_text;
};
