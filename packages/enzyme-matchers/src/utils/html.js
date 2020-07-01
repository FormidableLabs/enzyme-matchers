// @flow

import instance from './instance';
import isShallowWrapper from './isShallowWrapper';
import getConsoleObject from './getConsoleObject';
import type { EnzymeObject } from '../types';

const consoleObject = getConsoleObject();
const noop = () => {};

function mapWrappersHTML(wrapper: EnzymeObject): Array<string> {
  return wrapper.getElements().map(node => {
    const inst = instance(node);
    const type = node.type || inst._tag;

    const { error } = consoleObject;
    consoleObject.error = noop;
    const { children, ...props } = node.props
      ? node.props
      : inst._currentElement.props;
    consoleObject.error = error;

    const transformedProps = Object.keys(props).map(key => {
      try {
        return `${key}="${props[key].toString()}"`;
      } catch (e) {
        return `${key}="[object Object]"`;
      }
    });
    let stringifiedNode = `<${type} ${transformedProps.join(' ')}`;

    if (children) {
      stringifiedNode += `>[..children..]</${node.type}`;
    } else {
      stringifiedNode += '/>';
    }

    return stringifiedNode;
  });
}

export default function printHTMLForWrapper(
  wrapper: EnzymeObject,
  hostNodesOnly?: boolean
): string {
  switch (wrapper.getElements().length) {
    case 0: {
      return '[empty set]';
    }
    case 1: {
      if (isShallowWrapper(wrapper)) {
        return wrapper.debug();
      }
      if (hostNodesOnly) {
        return wrapper.html();
      }
      return wrapper.debug();
    }
    default: {
      const nodes = mapWrappersHTML(wrapper).reduce(
        (acc, curr, index) => `${acc}${index}: ${curr}\n`,
        ''
      );

      return `Multiple nodes found:\n${nodes}`;
    }
  }
}
