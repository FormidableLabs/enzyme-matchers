/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toContainMatchingElements
 * @flow
 */

import type { EnzymeObject, Matcher } from '../types';
import html from '../utils/html';
import getDisplayName from '../utils/displayName';
import getNodeName from '../utils/name';

function toContainMatchingElements(
  enzymeWrapper: EnzymeObject,
  n: number,
  selector: string
): Matcher {
  const matches = enzymeWrapper.find(selector);
  const pass = matches.length === n;
  const nodeName = getNodeName(enzymeWrapper);

  return {
    pass,
    message:
      `Expected <${nodeName}> to contain ${n} element${n === 1
        ? ''
        : 's'} matching ` +
      `"${getDisplayName(selector)}" but ${matches.length} ${matches.length ===
      1
        ? 'was'
        : 'were'} found.`,
    negatedMessage: `Expected <${nodeName}> to not contain ${n} element${n === 1
      ? ''
      : 's'} matching "${getDisplayName(selector)}" but it did.`,
    contextualInformation: {
      actual: `Element tree for <${nodeName}>:\n ${html(enzymeWrapper)}`,
    },
  };
}

export default toContainMatchingElements;
