import parse from "html-react-parser";

export const getRawText = (text) => {
  let raw_text = "";

  if (parse(text).length > 0) {
    parse(text).map((element) => {
      if (element.props.children) {
        if (typeof element.props.children === "string") {
          raw_text += element.props.children + " ";
        } else {
          if (
            element.props.children.props &&
            element.props.children.props.children
          ) {
            if (typeof element.props.children.props.children === "string") {
              raw_text += element.props.children.props.children + " ";
            }
          } else {
            if (
              element.props.children.props.children &&
              element.props.children.props.children.props &&
              element.props.children.props.children.props.children
            ) {
              if (
                typeof element.props.children.props.children.props.children ===
                "string"
              ) {
                raw_text +=
                  element.props.children.props.children.props.children + " ";
              } else {
                if (
                  element.props.children.props.children.props.children &&
                  element.props.children.props.children.props.children.props &&
                  element.props.children.props.children.props.children.props
                    .children
                ) {
                  if (
                    typeof element.props.children.props.children.props.children
                      .props.children === "string"
                  ) {
                    raw_text +=
                      element.props.children.props.children.props.children.props
                        .children + " ";
                  }
                } else {
                  return null;
                }
              }
            }
          }
        }
      }
    });
  } else if (typeof parse(text) === "object") {
    if (parse(text).props.children) {
      if (typeof parse(text).props.children === "string") {
        raw_text += parse(text).props.children + " ";
      } else {
        if (
          parse(text).props.children.props &&
          parse(text).props.children.props.children
        ) {
          if (typeof parse(text).props.children.props.children === "string") {
            raw_text += parse(text).props.children.props.children + " ";
          }
        } else {
          if (
            parse(text).props.children.props.children &&
            parse(text).props.children.props.children.props &&
            parse(text).props.children.props.children.props.children
          ) {
            if (
              typeof parse(text).props.children.props.children.props
                .children === "string"
            ) {
              raw_text +=
                parse(text).props.children.props.children.props.children + " ";
            } else {
              if (
                parse(text).props.children.props.children.props.children &&
                parse(text).props.children.props.children.props.children
                  .props &&
                parse(text).props.children.props.children.props.children.props
                  .children
              ) {
                if (
                  typeof parse(text).props.children.props.children.props
                    .children.props.children === "string"
                ) {
                  raw_text +=
                    parse(text).props.children.props.children.props.children
                      .props.children + " ";
                }
              } else {
                return null;
              }
            }
          }
        }
      }
    }
  }

  return raw_text;
};
