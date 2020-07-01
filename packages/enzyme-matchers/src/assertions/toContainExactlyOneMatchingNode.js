/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toContainExactlyOneMatchingNode
 * @flow
 */

import type { EnzymeObject, Matcher } from '../types';
import toContainMatchingNodes from './toContainMatchingNodes';

function toContainExactlyOneMatchingNode(
  enzymeWrapper: EnzymeObject,
  selector: string
): Matcher {
  return toContainMatchingNodes(enzymeWrapper, 1, selector);
}

export default toContainExactlyOneMatchingNode;
