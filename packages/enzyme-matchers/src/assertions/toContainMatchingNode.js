/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toContainMatchingElement
 * @flow
 */

import type { EnzymeObject, Matcher } from '../types';
import html from '../utils/html';
import getDisplayName from '../utils/displayName';
import getNodeName from '../utils/name';

function toContainMatchingNode(
  enzymeWrapper: EnzymeObject,
  selector: string
): Matcher {
  const matches = enzymeWrapper.find(selector).hostNodes();
  const pass = matches.length > 0;
  const nodeName = getNodeName(enzymeWrapper);

  return {
    pass,
    message:
      `Expected <${nodeName}> to contain at least one node matching ` +
      `"${getDisplayName(selector)}" but none were found.`,
    negatedMessage:
      `Expected <${nodeName}> to not contain a node matching ` +
      `"${getDisplayName(selector)}" but it did.`,
    contextualInformation: {
      actual: `HTML Output of <${nodeName}>:\n ${html(enzymeWrapper, true)}`,
    },
  };
}

export default toContainMatchingNode;
