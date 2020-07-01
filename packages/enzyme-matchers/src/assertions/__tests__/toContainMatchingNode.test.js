const PropTypes = require('prop-types');
const getNodeName = require('../../utils/name');
const toContainMatchingNode = require('../toContainMatchingNode');

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

describe('toContainMatchingNode', () => {
  [shallow, mount].forEach(renderer => {
    describe(`with a ${renderer.name} wrapper`, () => {
      const wrapper = renderer(<Fixture />);
      const firstUserWrapper =
        renderer === shallow
          ? wrapper.find('User').first().shallow()
          : wrapper.find('User');
      const argsToTest = [
        [wrapper, '.userOne', renderer === mount],
        [wrapper, '[data-index="value-1"]', renderer === mount],
        [wrapper, '[data-index]', renderer === mount],
        [firstUserWrapper, '[data-index="value-1"]', true],
        [firstUserWrapper, '.userOne', true],
      ];

      argsToTest.forEach(([currentWrapper, selector, expectedResult]) => {
        const result = toContainMatchingNode(currentWrapper, selector);
        it(`returns ${expectedResult} for "${selector}" in <${getNodeName(
          currentWrapper
        )}>`, () => {
          expect(result.pass).toBe(expectedResult);
        });

        it(`returns the proper verbage for "${selector}"`, () => {
          if (expectedResult) {
            expect(result.message).toMatchSnapshot();
          } else {
            expect(result.negatedMessage).toMatchSnapshot();
          }
        });

        it('provides contextual information for the message', () => {
          expect(result.contextualInformation).toMatchSnapshot();
        });
      });
    });
  });
});
