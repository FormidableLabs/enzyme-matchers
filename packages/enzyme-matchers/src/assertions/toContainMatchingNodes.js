/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toContainMatchingNodes
 * @flow
 */

import type { EnzymeObject, Matcher } from '../types';
import html from '../utils/html';
import getDisplayName from '../utils/displayName';
import getNodeName from '../utils/name';

function toContainMatchingNodes(
  enzymeWrapper: EnzymeObject,
  n: number,
  selector: string
): Matcher {
  const matches = enzymeWrapper.find(selector).hostNodes();
  const pass = matches.length === n;
  const nodeName = getNodeName(enzymeWrapper);

  return {
    pass,
    message:
      `Expected <${nodeName}> to contain ${n} node${n === 1
        ? ''
        : 's'} matching ` +
      `"${getDisplayName(selector)}" but ${matches.length} ${matches.length ===
      1
        ? 'was'
        : 'were'} found.`,
    negatedMessage: `Expected <${nodeName}> to not contain ${n} node${n === 1
      ? ''
      : 's'} matching "${getDisplayName(selector)}" but it did.`,
    contextualInformation: {
      actual: `HTML Output of <${nodeName}>:\n ${html(enzymeWrapper, true)}`,
    },
  };
}

export default toContainMatchingNodes;
