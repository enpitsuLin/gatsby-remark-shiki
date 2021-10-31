interface ElementProps {
  className?: string;
  children?: (VNode | string)[];
}
interface VNode {
  type: string;
  props: ElementProps;
}

interface CreateElementConfig extends Partial<ElementProps> {
  style?: string;
  [key: string]: any;
}

export function createElement(type, config: CreateElementConfig = {}, ...children: (VNode | string)[]): VNode {
  let props: ElementProps = {};
  if (config != null) {
    for (let propName in config) {
      props[propName] = config[propName];
    }
  }
  // resolve children
  props.children = children;
  return { type, props };
}

export function render(vnode: VNode | string): string {
  if (typeof vnode === "string") return vnode;
  const { props = {} } = vnode;
  let html = "";

  html += `<${vnode.type} `;
  for (let propName in props) {
    if (propName == "className") {
      html += `class="${props[propName]}"`;
    } else if (propName != "children") {
      html += `${propName}="${props[propName]}"`;
    }
  }
  html += ">";
  props.children.forEach((child) => {
    html += render(child);
  });
  html += `</${vnode.type}>`;

  return html;
}
