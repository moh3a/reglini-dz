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

      // if (typeof element.props.children === "string") {
      //   raw_text += element.props.children + " ";
      // } else if (typeof element.props.children.props.children === "string") {
      //   raw_text += element.props.children.props.children + " ";
      // } else if (
      //   typeof element.props.children.props.children.props.children ===
      //   "string"
      // ) {
      //   raw_text +=
      //     element.props.children.props.children.props.children + " ";
      // } else if (
      //   typeof element.props.children.props.children.props.children.props
      //     .children === "string"
      // ) {
      //   raw_text +=
      //     element.props.children.props.children.props.children.props
      //       .children + " ";
      // }
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
    // if (parse(text).props && typeof parse(text).props.children === "string") {
    //   raw_text += parse(text).props.children;
    // } else if (
    //   parse(text).props &&
    //   typeof parse(text).props.children !== "string"
    // ) {
    //   if (typeof parse(text).props.children.props.children === "string") {
    //     raw_text += parse(text).props.children.props.children;
    //   } else if (
    //     typeof parse(text).props.children.props.children.props.children ===
    //     "string"
    //   ) {
    //     raw_text += parse(text).props.children.props.children.props.children;
    //   } else if (
    //     typeof parse(text).props.children.props.children.props.children.props
    //       .children === "string"
    //   ) {
    //     raw_text +=
    //       parse(text).props.children.props.children.props.children.props.children;
    //   }
  }

  return raw_text;
};

export const getImages = (text) => {
  let images = [];
  if (text) {
    if (parse(text).length > 1) {
      parse(text).map((element, i) => {
        if (
          typeof element.props.children === "object" &&
          element.props.children.type === "img"
        ) {
          images.push({
            id: "image_src_" + i,
            src: element.props.children.props.src,
          });
          i++;
        }
      });
      return images;
    } else if (typeof parse(text) === "object" && parse(text).props) {
      if (
        typeof parse(text).props.children === "object" &&
        parse(text).props.children.type === "img"
      ) {
        return parse(text).props.children.props.src;
      } else {
        return null;
      }
    }
  } else {
    return null;
  }
};
