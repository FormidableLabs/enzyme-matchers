const PropTypes = require('prop-types');
const getNodeName = require('../../utils/name');
const toContainMatchingElements = require('../toContainMatchingElements');

function User(props) {
  return (
    <span className={props.className}>
      User <span data-index={`value-${props.index}`}>{props.index}</span>
    </span>
  );
}

User.propTypes = {
  index: PropTypes.number.isRequired,
  className: PropTypes.string,
};

function Fixture() {
  return (
    <div>
      <ul>
        <li>
          <User index={1} className="userOne" />
        </li>
        <li>
          <User index={2} className="userTwo" />
        </li>
      </ul>
    </div>
  );
}

describe('toContainMatchingElements', () => {
  [shallow, mount].forEach(renderer => {
    describe(`with a ${renderer.name} wrapper`, () => {
      const wrapper = renderer(<Fixture />);
      const argsToTest = [
        ['2 User', wrapper, 2, 'User', true],
        ['1 [index=1]', wrapper, 1, '[index=1]', true],
        ['2 [index]', wrapper, 2, '[index]', true],
        ['2 [index] in ul', wrapper.find('ul'), 2, '[index]', true],
        ['1 [index=1] in User', wrapper.find('User'), 1, '[index=1]', true],
        ['3 User', wrapper, 3, 'User', false],
        ['1 .userThree', wrapper, 1, '.userThree', false],
        ['1 [index]', wrapper, 1, '[index]', false],
        ['3 [index] in ul', wrapper.find('ul'), 3, '[index]', false],
        ['1 [data-index]', wrapper, 1, '[data-index]', false],
        ...(renderer === shallow
          ? [
              ['1 .userOne', wrapper, 1, '.userOne', true],
              ['0 [data-index]', wrapper, 0, '[data-index]', true],
              [
                '1 [data-index="value-1"]',
                wrapper,
                1,
                '[data-index="value-1"]',
                false,
              ],
            ]
          : []),
        ...(renderer === mount
          ? [
              ['2 .userOne', wrapper, 2, '.userOne', true],
              ['2 [data-index]', wrapper, 2, '[data-index]', true],
              [
                '1 [data-index="value-1"]',
                wrapper,
                1,
                '[data-index="value-1"]',
                true,
              ],
            ]
          : []),
      ];

      argsToTest.forEach(
        ([description, currentWrapper, count, selector, expectedResult]) => {
          const result = toContainMatchingElements(
            currentWrapper,
            count,
            selector
          );
          it(`returns ${expectedResult} for "${selector}" in <${getNodeName(
            currentWrapper
          )}>`, () => {
            expect(result.pass).toBe(expectedResult);
          });

          it(`returns the proper verbage for "${description}"`, () => {
            if (expectedResult) {
              expect(result.message).toMatchSnapshot();
            } else {
              expect(result.negatedMessage).toMatchSnapshot();
            }
          });

          it('provides contextual information for the message', () => {
            expect(result.contextualInformation).toMatchSnapshot();
          });
        }
      );
    });
  });
});
