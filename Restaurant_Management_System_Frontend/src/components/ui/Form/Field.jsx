import {
  useId,
  cloneElement,
  isValidElement,
  Children,
  memo,
} from "react";

const Field = ({ id = "", children, ...rest }) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  const processChildren = (child) => {
    if (!isValidElement(child)) return child;

    const childType =
      typeof child.type === "string"
        ? child.type
        : child.type.displayName;

    const childProps = child.props || {};
    const htmlFor = childProps.htmlFor;
    const childId = childProps.id;
    const childChildren = childProps.children;

    const newProps = {};

    if (childType === "label" && !htmlFor) {
      newProps.htmlFor = inputId;
    }

    if (
      ["input", "checkbox", "radio", "selectbox", "textarea"].includes(
        childType
      ) &&
      !childId
    ) {
      newProps.id = inputId;
    }

    if (childChildren && typeof childChildren !== "string") {
      newProps.children = Children.map(childChildren, processChildren);
    }

    return Object.keys(newProps).length > 0
      ? cloneElement(child, newProps)
      : child;
  };

  return <div {...rest}>{Children.map(children, processChildren)}</div>;
};

export default memo(Field);
